
const { useState, useEffect } = React

// This one Made with AI
export function Home() {
    
    useEffect(()=> {
        document.title = 'Tododay';
    })

    return (
        <section className="home">
            <section className="hero">
                <h1>Welcome to <span>Todaydo</span></h1>
                <p>Organize your tasks, boost your productivity, and make every day count!</p>
                <div className="hero-buttons">
                    <a href="#" className="signup-btn">Get Started</a>
                    <a href="#" className="login-btn">Log In</a>
                </div>
            </section>

            <section className="features">
                <h2>Why Choose Todaydo?</h2>
                <div className="feature-cards">
                    <div className="feature">
                        <h3>✅ Stay Organized</h3>
                        <p>Create, manage, and prioritize your tasks with ease.</p>
                    </div>
                    <div className="feature">
                        <h3>📅 Plan Ahead</h3>
                        <p>Visualize your schedule with our calendar integration.</p>
                    </div>
                    <div className="feature">
                        <h3>🚀 Boost Productivity</h3>
                        <p>Track progress and achieve your goals faster.</p>
                    </div>
                </div>
            </section>
        </section>
    )
}