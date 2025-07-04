package com.ecommerce.repository;

import com.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Finds products by their category ID, with pagination.
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    // Finds products whose name contains the given string, ignoring case, with pagination.
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    // Finds products by category ID and name containing, ignoring case, with pagination.
    Page<Product> findByCategoryIdAndNameContainingIgnoreCase(Long categoryId, String name, Pageable pageable);


    /**
     * Finds products based on optional category ID and product name.
     * The 'active' filter has been removed to match the updated Product entity.
     *
     * @param categoryId Optional category ID to filter by.
     * @param name       Optional product name (case-insensitive, partial match) to filter by.
     * @param pageable   Pagination information.
     * @return A Page of Product entities matching the criteria.
     */
    @Query("SELECT p FROM Product p WHERE " +
            "(:categoryId IS NULL OR p.category.id = :categoryId) AND " +
            "(:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')))")
    Page<Product> findByFilters(@Param("categoryId") Long categoryId,
                                @Param("name") String name,
                                Pageable pageable);

    /**
     * Finds products with quantity below a specified threshold.
     * Renamed from findLowStockProducts to avoid Spring Data JPA's derived query parsing issues.
     *
     * @param threshold The maximum quantity for a product to be considered low stock.
     * @return A list of Product entities that are low in stock.
     */
    @Query("SELECT p FROM Product p WHERE p.quantity < :threshold")
    List<Product> findProductsWithQuantityBelowThreshold(@Param("threshold") Integer threshold); // RENAMED METHOD

    // Counts the number of products in a specific category.
    long countByCategoryId(Long categoryId);
}
