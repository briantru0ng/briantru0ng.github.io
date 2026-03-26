---
title: "Mutation Prediction"
description: "Benchmarking fine-tuned protein language models (ESM2, ProtBERT) against classical alignment tools for predicting pathogenicity of single amino acid variants."
date: 2024-05-05
image: "/images/mutation-prediction.jpg"
tags: ["Python", "Bioinformatics", "Deep Learning", "Transformers", "NLP", "PyTorch"]
github: "https://github.com/briantru0ng/Mutation-Prediction"
featured: true
order: 6
shown: true
---

A research pipeline that evaluates whether fine-tuned protein language models can outperform classical alignment-based tools in predicting the pathogenicity of single amino acid variants (SAVs).

## Overview

This project investigates whether custom transformer-based models — fine-tuned from pretrained protein language models like **ESM2** and **ProtBERT** — can beat classical tools like **SIFT** at classifying whether a mutation in a protein sequence is pathogenic or benign. A balanced dataset was curated from **ClinVar**, focused on key cancer-related genes including TP53, BRCA1/2, KRAS, and PIK3CA.

## Models & Approach

Four approaches were benchmarked across the same dataset:

- **SIFT** — classical alignment-based baseline; high pathogenic recall but low precision (~70% accuracy)
- **Pretrained ESM2** — mean-pooled transformer embeddings fed into logistic regression (~65% accuracy)
- **Pretrained ProtBERT** — 768-dim pooled last hidden state, same classification head (~66% accuracy)
- **Custom ESM2** — fine-tuned with additional encoder layers and partial unfreezing (**~82% accuracy, F1: 0.82/0.81**)

## Tech Stack

Built with Python, PyTorch, Hugging Face Transformers, ESM2, ProtBERT, scikit-learn, and Jupyter Notebooks. Data sourced from ClinVar.

## Results

The custom fine-tuned ESM2 model significantly outperformed all baselines — gaining ~12 points in accuracy over SIFT and ~17 points over the frozen pretrained models. The key insight is that fine-tuning, even with a relatively small domain-specific dataset, unlocks substantially better representations than frozen embeddings alone.

## What I Learned

Working at the intersection of NLP and computational biology required understanding both transformer architecture internals and the biological significance of protein mutations. Key challenges included handling class imbalance in ClinVar data, deciding which layers to unfreeze during fine-tuning, and evaluating models with biologically meaningful metrics rather than just accuracy. This project reinforced how domain-specific fine-tuning can dramatically close the gap between deep learning models and established domain tools.
