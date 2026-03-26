---
title: "Wind Wake Optimization"
description: "A Streamlit-based GUI for optimizing wind turbine yaw angles using FLORIS, built as a capstone project in partnership with BP."
date: 2023-12-15
image: "/images/wind-wake-optimization.jpg"
tags: ["Python", "Streamlit", "FLORIS", "NumPy", "Pandas", "Data Visualization", "Optimization"]
github: "https://github.com/briantru0ng/BPWindWakePSUFA2023"
featured: true
order: 8
shown: true
---

An interactive wind farm optimization tool that computes optimal turbine yaw angles to minimize wake losses and maximize energy output — built as a Penn State capstone project in partnership with BP.

## Overview

Wind turbines operating in close proximity create aerodynamic wake effects that reduce downstream power output. This project provides a GUI where engineers can upload historical wind data for a farm, configure optimization parameters (wind speed, direction, yaw angle bounds, mathematical model), and visualize the resulting yaw strategies. The tool supports both continuous (single-condition) and batch (historical CSV) analysis modes, enabling operators to evaluate optimization gains across thousands of real-world wind scenarios.

## Key Features

- **Continuous optimization** — single-point analysis for a given wind speed and direction, with configurable yaw angle bounds and air density
- **Batch optimization** — upload historical CSV data and run FLORIS optimization at user-defined time intervals (hourly, daily, weekly, monthly) with parallel processing support
- **Multiple wake models** — choose between Jensen, GCH, Cumulative Curl, and Gauss mathematical models for wake calculations
- **Farm visualizations** — turbine layout plots, flow field visualizations, and characteristic curves generated with Matplotlib
- **YAML-driven farm configs** — wind farm layouts and turbine specifications defined in modular YAML files with include support
- **Data extrapolation** — option to extrapolate partial-year datasets to full-year estimates

## Tech Stack

Built with Python, Streamlit, FLORIS (NREL's wind farm wake modeling framework), NumPy, Pandas, SciPy, Matplotlib, and PyYAML. Documentation generated with Sphinx.

## What I Learned

This capstone introduced me to domain-specific engineering software and the challenge of wrapping complex simulation libraries behind an intuitive interface. Key takeaways included working with FLORIS's optimization API (particularly the Serial Refine yaw optimizer), designing a Streamlit app that handles long-running parallel computations without blocking the UI, and collaborating with an industry sponsor (BP) to align technical deliverables with real operational needs. The project also deepened my understanding of how small yaw adjustments across a farm can compound into meaningful energy gains.
