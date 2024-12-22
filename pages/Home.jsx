import { ToggleButton } from "../cmps/ToggleButton.jsx"

// This one Made with AI
const { useState } = React

export function Home() {
    
    return (
        <section className="home">
            <section class="hero">
                <h1>Welcome to <span>Tododay</span></h1>
                <p>Organize your tasks, boost your productivity, and make every day count!</p>
                <div class="hero-buttons">
                    <a href="#" class="signup-btn">Get Started</a>
                    <a href="#" class="login-btn">Log In</a>
                </div>
            </section>

            <section class="features">
                <h2>Why Choose Tododay?</h2>
                <div class="feature-cards">
                    <div class="feature">
                        <h3>✅ Stay Organized</h3>
                        <p>Create, manage, and prioritize your tasks with ease.</p>
                    </div>
                    <div class="feature">
                        <h3>📅 Plan Ahead</h3>
                        <p>Visualize your schedule with our calendar integration.</p>
                    </div>
                    <div class="feature">
                        <h3>🚀 Boost Productivity</h3>
                        <p>Track progress and achieve your goals faster.</p>
                    </div>
                </div>
            </section>
        </section>
    )
}