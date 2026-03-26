---
title: "RL Maze Solver: DQN vs Q-Learning"
description: "A comparative study of Deep Q-Networks and tabular Q-Learning for maze navigation, with three exploration strategies and a custom Pygame environment."
date: 2025-04-01
image: "/images/rl-maze-solver.jpg"
tags: ["Python", "PyTorch", "Reinforcement Learning", "DQN", "Q-Learning", "Pygame", "Matplotlib"]
github: ""
featured: false
order: 2
shown: true
---

A reinforcement learning project that implements and compares Deep Q-Networks (DQN) and tabular Q-Learning for solving grid-based mazes, with three different exploration strategies and a full suite of training visualizations and trajectory analysis.

## Overview

An agent is placed in a 2D grid maze with walls and must navigate to a goal position. The project implements both a neural network-based DQN agent and a traditional tabular Q-Learning agent, then systematically compares their performance across three exploration strategies — epsilon-decay, Boltzmann exploration, and a novel performance-based adaptive method. A custom Pygame environment renders the maze and agent in real time, while YAML configuration files make it easy to run grid search experiments across hyperparameters.

## Approach

- **Custom maze environment** — Pygame-based 2D grid with 5-dimensional observation space (adjacent cell states) and 5 discrete actions (4 directions + stay), with reward shaping (+1 goal, -0.01 per step) to encourage efficient paths
- **DQN agent** — deep Q-network with experience replay (10k buffer), periodic target network updates, and configurable hidden layers/units, trained with Adam optimizer
- **Q-Learning agent** — tabular state-action value table with configurable learning rate and discount factor, serving as a lightweight baseline
- **Three exploration strategies** — epsilon-decay (exponential decay), Boltzmann (temperature-based softmax over Q-values), and performance-based (adaptive epsilon that only decays when recent reward average improves)
- **Grid search experiments** — systematic evaluation across 2 agents x 3 strategies x 2 maze sizes (10x10 and 13x13), with full metric logging and visualization
- **Interactive maze editor** — Pygame tool for creating custom mazes of any size

## Tech Stack

Built with Python, PyTorch (DQN networks with CUDA support), Pygame (environment rendering and maze editor), NumPy (data storage and computation), and Matplotlib/SciPy (training metric plots with moving averages and 95% confidence intervals). Experiments configured via YAML files with timestamped output directories.

## What I Learned

The most interesting finding was how much the exploration strategy matters relative to the choice of algorithm. Boltzmann exploration produced qualitatively different learning behavior than epsilon-decay — smoother convergence but sometimes getting stuck in local optima. The performance-based adaptive strategy was appealing in theory but tricky to tune, since the threshold for "improvement" had to match the problem's reward scale. Building the full pipeline — environment, agents, config system, logger, visualizer, and maze editor — taught me how much engineering goes into making RL experiments reproducible and interpretable. Trajectory heatmaps were especially useful for diagnosing whether an agent had actually learned a good policy versus memorizing a single path.
