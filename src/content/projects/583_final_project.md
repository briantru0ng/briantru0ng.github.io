---
title: "Temporal Motion Matching via Transfer Learning"
description: "A two-stage deep learning approach using Siamese CNNs and ConvLSTM autoencoders with attention to learn temporal alignment of movement sequences across subjects."
date: 2025-05-01
image: "/images/temporal-motion-matching.jpg"
tags: ["Python", "PyTorch", "Siamese Networks", "ConvLSTM", "Attention", "DTW", "Transfer Learning", "Computer Vision"]
github: ""
featured: true
order: 1
shown: true
---

A deep learning project that learns temporal correspondences between different performers executing the same movement sequence, using a two-stage training approach with Siamese CNNs and ConvLSTM autoencoders to produce embeddings suitable for Dynamic Time Warping alignment across subjects.

## Overview

Given video patches of 10 subjects each performing 2-3 takes of the same movement, the goal is to learn frame-level embeddings that enable accurate temporal alignment — finding which frame in Subject A's performance corresponds to which frame in Subject B's. This is challenging because different people move at different speeds, with different styles, and the model must generalize to entirely unseen subjects. The project implements a two-stage transfer learning pipeline validated with leave-one-subject-out cross-validation.

## Approach

- **Stage 1: Initial embedding learning** — train on within-subject positive pairs (same frame across different takes) using either a Siamese CNN with contrastive cosine loss or a ConvLSTM autoencoder with MSE reconstruction loss
- **Stage 2: Cross-subject augmentation** — use Stage 1 embeddings to compute DTW alignment paths between subjects, generate synthetic cross-subject training pairs from the discovered correspondences, and fine-tune the model on the augmented dataset
- **Siamese CNN** — three convolutional layers (32 → 64 → 256 channels) with Tanh activations, trained with SGD and contrastive cosine loss to pull matching frames together in embedding space
- **ConvLSTM autoencoder** — 3 conv blocks with max pooling, 2-3 ConvLSTM layers (64 hidden channels) for temporal modeling, 2D spatial self-attention, and an upsampling decoder for frame reconstruction
- **DTW alignment** — cosine distance matrices computed between subject embeddings, with Dynamic Time Warping finding optimal alignment paths for cross-subject pair generation
- **Leave-one-subject-out validation** — 10 independent models trained, each holding out one subject to evaluate cross-subject generalization

## Tech Stack

Built with Python and PyTorch (CUDA 12.1) for model training. SciPy and fastdtw for DTW computation. scikit-learn for evaluation metrics (mAP, Recall@K) and t-SNE visualization. Data stored as MATLAB .mat patch files, with the original framework adapted from MatConvNet. Jupyter notebooks used for alignment visualization and analysis.

## What I Learned

The two-stage training strategy was the most conceptually interesting part — using a model's own predictions to discover cross-subject correspondences, then bootstrapping those discoveries back into training data. It's a form of self-supervised data augmentation that worked surprisingly well. Comparing Siamese CNNs with ConvLSTM autoencoders revealed different strengths: the Siamese network directly optimized for embedding similarity, while the ConvLSTM captured temporal dynamics through reconstruction but required more careful architecture tuning. Evaluation was also non-trivial — DTW cost, mAP, and Recall@K each told different parts of the story, and t-SNE plots were essential for qualitative sanity checks on whether embeddings were clustering by movement phase rather than by subject identity.
