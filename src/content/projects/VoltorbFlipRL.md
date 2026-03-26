---
title: "Voltorb Flip RL"
description: "A reinforcement learning agent trained with PPO to play Voltorb Flip, the Minesweeper-meets-Picross minigame from Pokemon HeartGold/SoulSilver."
date: 2023-12-20
image: "/images/voltorb-flip-rl.jpg"
tags: ["Python", "Reinforcement Learning", "PyTorch", "Gymnasium", "Stable Baselines3", "Pygame"]
github: "https://github.com/briantru0ng/Voltorb-Flip-RL"
featured: true
order: 7
shown: true
---

A reinforcement learning agent that learns to play Voltorb Flip — a probability-based minigame from Pokemon HeartGold and SoulSilver that combines elements of Minesweeper and Picross.

## Overview

Voltorb Flip presents a 5x5 grid of hidden tiles, each concealing a multiplier (1x, 2x, 3x) or a Voltorb (game over). Row and column hints reveal the total point value and Voltorb count for each line. Players must deduce which tiles are safe to flip to maximize their score without hitting a Voltorb. This project frames the game as a Gymnasium environment and trains a PPO agent to learn tile-flipping strategies through trial and error.

## Approach

- **Custom Gym environment** — full game logic (board generation, level progression, scoring, row/column hint system) implemented as a `gymnasium.Env` with discrete action and observation spaces
- **PPO training** — Proximal Policy Optimization via Stable Baselines3 with an MLP policy, trained across multiple instances with iterative model selection
- **Custom reward shaping** — composite reward function factoring in level-ups, lines cleared, score, click efficiency, and early-failure penalties to guide the agent toward strategic play
- **Visual rendering** — Pygame-based rendering with card sprites, grid overlays, and real-time game state display for evaluating agent behavior

## Tech Stack

Built with Python, Gymnasium (OpenAI Gym), Stable Baselines3, PyTorch, Pygame, and NumPy. Training runs managed through Jupyter Notebooks with TensorBoard logging.

## What I Learned

Building a custom RL environment from scratch was the biggest challenge — translating game rules into a well-defined observation/action space that an agent can actually learn from required careful thought about state representation. Reward shaping proved critical: naive rewards led to agents that either played too conservatively or flipped randomly, and the final composite reward function went through several iterations. This project gave me hands-on experience with the full RL pipeline — environment design, training loop, hyperparameter tuning, and model evaluation — and a deeper appreciation for how much domain knowledge goes into making RL work on non-trivial problems.
