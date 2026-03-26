---
title: "Taiji Movement Classification"
description: "A comparative study of KNN and deep MLP classifiers for recognizing 39 Tai Chi movements from motion capture data, using Fisher's LDA and leave-one-subject-out validation."
date: 2025-03-01
image: "/images/taiji-classification.jpg"
tags: ["Python", "PyTorch", "scikit-learn", "KNN", "MLP", "LDA", "Human Activity Recognition"]
github: ""
featured: false
order: 3
shown: true
---

A machine learning pipeline that classifies 39 distinct Taiji (Tai Chi) movements from motion capture data across 10 subjects, comparing traditional KNN with deep MLP classifiers and evaluating the impact of feature selection and Fisher's Linear Discriminant Analysis on generalization.

## Overview

The dataset contains motion capture features (body joint coordinates with x, y, z positions and confidence scores for 17 joints) from 10 subjects each performing 39 different Taiji movements. The core challenge is cross-subject generalization — can a model trained on 9 subjects correctly classify movements performed by an unseen 10th subject? The project explores this through feature selection, dimensionality reduction, and a rigorous leave-one-subject-out (LOSO) evaluation protocol.

## Approach

- **Feature selection** — two strategies compared: a filter method ranking features by variance (top 10), and a wrapper method using Sequential Forward Selection with Random Forest as the base estimator
- **Fisher's LDA** — custom implementation of Linear Discriminant Analysis projecting high-dimensional features into a 2D subspace using between-class and within-class scatter matrices for visualization and classification
- **KNN classifier** — k-Nearest Neighbors (k=3) applied to both raw features and LDA-projected data as a traditional baseline
- **MLP classifier** — PyTorch multi-layer perceptron with configurable architecture (512-2048 hidden units, 3-5 layers), trained with iterative hyperparameter tuning across batch size, learning rate, and epochs
- **LOSO cross-validation** — strict leave-one-subject-out protocol ensuring no data leakage, with each of 10 subjects held out as the test set in turn

## Tech Stack

Built with Python, PyTorch (MLP training), and scikit-learn (KNN, feature selection utilities). NumPy for data processing and Matplotlib for confusion matrix visualization. Experiments managed across multiple feature set sizes (100, 200, 300 features).

## What I Learned

The biggest takeaway was how challenging cross-subject generalization is for human activity recognition — training accuracy often reached 98% while test accuracy on held-out subjects dropped to 15-30%, revealing severe overfitting to subject-specific movement patterns. Fisher's LDA helped visualize class separability but the 39-class problem remained difficult in just 2 dimensions. Feature selection showed that certain body joints (like Joint 9 and Joint 15) were far more discriminative than others, suggesting that domain knowledge about which joints matter most for each movement could significantly improve results. The MLP consistently outperformed KNN, but neither approach fully solved the domain shift problem inherent in LOSO validation.
