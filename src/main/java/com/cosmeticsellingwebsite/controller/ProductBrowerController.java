package com.cosmeticsellingwebsite.controller;

import com.cosmeticsellingwebsite.payload.response.ProductDetailResponse;
import com.cosmeticsellingwebsite.service.impl.CategoryService;
import com.cosmeticsellingwebsite.service.impl.ProductService;
import com.cosmeticsellingwebsite.util.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/browser")
public class ProductBrowerController {
    @Autowired
    CategoryService categoryService;
    @Autowired
    private ProductService productService;


    @GetMapping("/category/products")
    public ResponseEntity<?> getCategoryWithProducts(@RequestParam Long categoryId, @RequestParam(required = false) Integer page) {
        if (page == null) {
            return ResponseEntity.ok(categoryService.getCategoryWithProducts(categoryId));
        }
        int totalProducts = categoryService.countProducts(categoryId);
        int pageSize = 10;
        int totalPages = (int) Math.ceil((double) totalProducts / pageSize);
        int pageNumber = page; // trang đầu tiên
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("productCode").ascending());
        return ResponseEntity.ok(categoryService.getCategoryWithProductsPaging(categoryId, pageable));
    }
    @GetMapping("/categories")
    public Object getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategoriess());
    }
    @GetMapping("/products")
    public String browseProducts() {
//        Logger.log("Browsing products");
        return "user/products";
    }
//    @GetMapping("/product/{productCode}")
//    public String productDetail(@PathVariable("productCode") String productCode, ModelMap model) {
//        model.addAttribute("productCode", productCode); // Thêm sản phẩm vào model
//        return "user/product"; // Trả về view product-detail
//    }
    @GetMapping("/product/{productId}")
    public String productDetail(@PathVariable("productId") Long productId, ModelMap model) {
        ProductDetailResponse productDetailResponse = productService.getProductDetailById(productId);
        model.addAttribute("productId", productId); // Thêm sản phẩm vào model
        model.addAttribute("product", productDetailResponse);
        Logger.log("Product detail: " + productDetailResponse);
        return "user/product-detail"; // Trả về view product-detail
    }
}
