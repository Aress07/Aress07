package com.ecommerce.service;

import com.ecommerce.dto.ProductDto;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.Category;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime; // For createdAt in Product entity
import java.util.List; // For findLowStockProducts
import java.util.stream.Collectors; // For stream operations

@Service
@RequiredArgsConstructor
@Transactional // Apply transactional behavior to all methods in this service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    /**
     * Retrieves all products based on optional filters (category ID, name) with pagination.
     * The 'active' filter has been removed to match the updated Product entity.
     *
     * @param categoryId Optional category ID to filter by.
     * @param name       Optional product name (case-insensitive, partial match) to filter by.
     * @param active     This parameter is now ignored as the 'active' column has been removed.
     * @param pageable   Pagination information.
     * @return A Page of ProductDto objects.
     */
    @Transactional(readOnly = true)
    public Page<ProductDto> getAllProducts(Long categoryId, String name, Boolean active, Pageable pageable) {
        // The 'active' parameter is no longer used in findByFilters as the column is removed.
        return productRepository.findByFilters(categoryId, name, pageable) // Removed 'active' from parameters
                .map(this::convertToDto);
    }

    /**
     * Retrieves a single product by its ID.
     *
     * @param id The ID of the product to retrieve.
     * @return The ProductDto object.
     * @throws ResourceNotFoundException if the product is not found.
     */
    @Transactional(readOnly = true)
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return convertToDto(product);
    }

    /**
     * Retrieves products by category ID with pagination.
     *
     * @param categoryId The ID of the category.
     * @param pageable   Pagination information.
     * @return A Page of ProductDto objects.
     * @throws ResourceNotFoundException if the category is not found.
     */
    @Transactional(readOnly = true)
    public Page<ProductDto> getProductsByCategory(Long categoryId, Pageable pageable) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }

        return productRepository.findByCategoryId(categoryId, pageable)
                .map(this::convertToDto);
    }

    /**
     * Creates a new product.
     *
     * @param productDto The ProductDto containing product details.
     * @return The created ProductDto object.
     * @throws ResourceNotFoundException if the specified category is not found.
     */
    public ProductDto createProduct(ProductDto productDto) {
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + productDto.getCategoryId()));

        Product product = convertToEntity(productDto);
        product.setCategory(category);
        // createdAt is handled by @PrePersist in the Product entity, not set from DTO

        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    /**
     * Updates an existing product.
     *
     * @param id         The ID of the product to update.
     * @param productDto The ProductDto containing updated product details.
     * @return The updated ProductDto object.
     * @throws ResourceNotFoundException if the product or category is not found.
     */
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + productDto.getCategoryId()));

        existingProduct.setName(productDto.getName());
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setQuantity(productDto.getQuantity());
        // Removed: existingProduct.setImageUrl(productDto.getImageUrl()); // 'imageUrl' removed from Product
        // Removed: existingProduct.setActive(productDto.getActive());     // 'active' removed from Product
        // createdAt is not updated via DTO
        // Removed: existingProduct.setUpdatedAt(productDto.getUpdatedAt()); // 'updatedAt' removed from Product

        existingProduct.setCategory(category);

        Product updatedProduct = productRepository.save(existingProduct);
        return convertToDto(updatedProduct);
    }

    /**
     * Deletes a product by its ID.
     *
     * @param id The ID of the product to delete.
     * @throws ResourceNotFoundException if the product is not found.
     */
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        productRepository.delete(product);
    }

    // Removed: public ProductDto toggleProductActive(Long id)
    // This method is no longer valid as the 'active' column has been removed from the Product entity.

    /**
     * Retrieves a list of products that are low in stock (quantity below threshold).
     *
     * @param threshold The maximum quantity for a product to be considered low stock.
     * @return A List of ProductDto objects representing low stock products.
     */
    @Transactional(readOnly = true)
    public List<ProductDto> getLowStockProducts(Integer threshold) {
        // Calling the renamed repository method
        return productRepository.findProductsWithQuantityBelowThreshold(threshold)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    /**
     * Converts a Product entity to a ProductDto.
     *
     * @param product The Product entity.
     * @return The corresponding ProductDto.
     */
    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setQuantity(product.getQuantity());
        // Removed: dto.setImageUrl(product.getImageUrl()); // 'imageUrl' removed from Product
        // Removed: dto.setActive(product.getActive());     // 'active' removed from Product
        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getName());
        dto.setCreatedAt(product.getCreatedAt());
        // Removed: dto.setUpdatedAt(product.getUpdatedAt()); // 'updatedAt' removed from Product
        return dto;
    }

    /**
     * Converts a ProductDto to a Product entity.
     *
     * @param dto The ProductDto.
     * @return The corresponding Product entity.
     */
    private Product convertToEntity(ProductDto dto) {
        Product product = new Product();
        // ID is not set for new entities; it's generated by DB
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        // Removed: product.setImageUrl(dto.getImageUrl()); // 'imageUrl' removed from Product
        // Removed: product.setActive(dto.getActive() != null ? dto.getActive() : true); // 'active' removed from Product
        // createdAt is handled by @PrePersist in the Product entity.
        // updatedAt is removed.
        return product;
    }
}
