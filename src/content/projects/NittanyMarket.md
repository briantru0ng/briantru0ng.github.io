---
title: "Nittany Market"
description: "A full-stack e-commerce marketplace built with Flask and SQLite, featuring multi-role authentication, dynamic category hierarchies, shopping cart, checkout, and helpdesk support — developed for Penn State's CMPSC 431W (Database Management Systems)."
date: 2024-12-10
image: "/images/DSC_0276.jpg"
tags: ["Python", "Flask", "SQLite", "SQL", "JavaScript", "Bootstrap", "HTML/CSS"]
github: "https://github.com/briantru0ng/cmpsc431w"
featured: true
order: 5
shown: true
---

A full-stack e-commerce marketplace supporting buyers, sellers, and helpdesk agents — built as a group project for Penn State's CMPSC 431W (Database Management Systems) course.

## Overview

Nittany Market is a multi-role web application where buyers can browse products through a dynamic category hierarchy, search and filter listings, manage a shopping cart, and check out with saved or new credit cards. Sellers can create, edit, promote, and deactivate product listings. Helpdesk agents handle user requests and manage the category taxonomy. The entire system is backed by a relational SQLite database with session-based authentication enforced across all protected routes.

## Key Features

- **Multi-role authentication** — session-based login for buyers, sellers, and helpdesk users with route-level access control
- **Dynamic category hierarchy** — recursive SQL CTEs enable unlimited nesting depth with breadcrumb navigation and automatic leaf-node detection
- **Shopping cart & checkout** — real-time AJAX cart management with stock validation, support for saved and new credit cards, and automatic inventory/balance updates on order placement
- **Product search** — keyword substring matching across titles, descriptions, categories, and seller emails with min/max price filtering
- **Seller dashboard** — listing management with active/sold-out/inactive states, inline editing, and a paid promotion system that surfaces listings to the top of buyer results
- **Product & seller reviews** — buyers can leave star ratings and written reviews tied to specific orders, with average ratings displayed on product pages
- **Helpdesk support** — request queue with claim/assign workflow, category creation with validation, and request rejection handling

## Tech Stack

Built with Python, Flask, SQLite, JavaScript, Bootstrap, HTML, and CSS. Database interactions use raw SQL with parameterized queries. Frontend interactivity is handled through vanilla JavaScript with AJAX calls to Flask API endpoints.

## What I Learned

This project was a deep exercise in relational database design and translating ER diagrams into a working application. Key challenges included designing recursive SQL queries (CTEs) for the category hierarchy, maintaining data integrity across the cart-to-order pipeline (stock decrements, seller balance credits, status transitions), and coordinating a multi-role permission model using Flask sessions. Working in a team of five also reinforced the importance of clear API contracts between frontend and backend contributors.
