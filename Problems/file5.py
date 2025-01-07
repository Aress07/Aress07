def productExceptSelf(nums):
    prefix = [0] * len(nums) 
    postfix = [0] * len(nums)
    product = 1
    product_1 = 1
    for i in range(len(nums)):
        product *= nums[i]
        prefix[i] = product
    for i in range(len(nums)-1,-1,-1):
        product_1 *= nums[i]
        postfix[i] = product_1 
    for i in range(len(nums)):
        if i == 0 :
            nums[i] = postfix[i+1]
        elif i == len(nums) - 1:
            nums[i] = prefix[i-1]
        else:
            nums[i] = postfix[i+1] * prefix[i-1]
    return nums