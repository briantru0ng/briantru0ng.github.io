---
title: "Polynomial Regression: MLE vs MAP"
description: "A from-scratch implementation of polynomial linear regression comparing Maximum Likelihood Estimation and Maximum A Posteriori inference on noisy sinusoidal data."
date: 2025-02-01
image: "/images/polynomial-regression.jpg"
tags: ["Python", "NumPy", "Matplotlib", "Linear Regression", "Bayesian Inference", "Machine Learning"]
github: ""
featured: false
order: 4
shown: true
---

A probabilistic machine learning project implementing polynomial regression from scratch, comparing unregularized Maximum Likelihood Estimation (MLE) with regularized Maximum A Posteriori (MAP) inference on synthetically generated noisy sinusoidal data.

## Overview

Given a noisy sine function sampled at 50 points, the goal is to fit polynomial curves of varying degree and compare two statistical estimation approaches. MLE finds weights that maximize the data likelihood, while MAP incorporates a Gaussian prior on the weights to regularize the solution. Both methods produce predictions with confidence intervals derived from their respective precision parameters, allowing direct comparison of fit quality and uncertainty quantification.

## Approach

- **Synthetic data generation** — 50 sample points drawn from sin(0.5x) with additive Gaussian noise (sigma = 0.3), spanning 1 to 4pi
- **Polynomial feature expansion** — input features expanded into a design matrix of polynomial terms up to degree M, enabling non-linear fitting with linear algebra
- **Maximum Likelihood** — closed-form solution w_ML = (X^T X)^-1 X^T t with noise precision beta estimated from residuals
- **Maximum A Posteriori** — regularized solution w_MAP = (beta X^T X + alpha I)^-1 beta X^T t using a Gaussian prior (alpha = 0.005, beta = 11.1) to penalize large weights and reduce overfitting
- **Confidence visualization** — shaded regions showing +/- one standard deviation around predictions, illustrating how uncertainty varies across the input space

## Tech Stack

Built entirely from scratch with Python and NumPy for all matrix computations and closed-form solutions. Matplotlib used for visualization of predictions, ground truth, and confidence intervals. No external ML libraries.

## What I Learned

Implementing both MLE and MAP from scratch gave me a concrete understanding of how regularization works at the mathematical level — MAP is essentially MLE with an added penalty term from the prior, and the effect on the weight vector is immediately visible in the equations. The most instructive part was seeing how MLE overfits with higher polynomial degrees while MAP produces smoother, more generalizable curves. Computing and visualizing confidence intervals also reinforced how Bayesian approaches naturally quantify uncertainty, with intervals widening in regions with sparse data and narrowing where observations are dense.
