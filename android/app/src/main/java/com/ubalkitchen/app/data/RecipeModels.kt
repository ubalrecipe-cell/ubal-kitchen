package com.ubalkitchen.app.data

data class Recipe(
    val id: String,
    val nameEn: String,
    val nameHi: String,
    val taglineEn: String,
    val taglineHi: String,
    val descriptionEn: String,
    val descriptionHi: String,
    val prepTime: Int,
    val cookTime: Int,
    val totalTime: Int,
    val defaultServings: Int,
    val difficulty: String,
    val dietary: String,
    val mealCategory: String,
    val cuisine: String,
    val ingredients: List<IngredientItem>,
    val steps: List<CookingStep>,
    val tipsEn: List<String>,
    val tipsHi: List<String>,
    val allergensEn: List<String>,
    val allergensHi: List<String>
)

data class IngredientItem(
    val id: String,
    val nameEn: String,
    val nameHi: String,
    val amount: Double,
    val unit: String,
    val isRequired: Boolean,
    val isPantryStaple: Boolean = false
)

data class CookingStep(
    val stepNumber: Int,
    val instructionEn: String,
    val instructionHi: String,
    val durationMinutes: Int? = null,
    val timerSeconds: Int? = null,
    val tipEn: String? = null,
    val tipHi: String? = null
)
