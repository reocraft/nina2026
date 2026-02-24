// Countdown timer for February 27, 2026 in Japan Standard Time (JST)
// JST is UTC+9

window.addEventListener('DOMContentLoaded', function() {
    // Target date: February 27, 2026, 00:00:00 JST
    // Convert to UTC: February 26, 2026, 15:00:00 UTC (JST is UTC+9)
    const targetDate = new Date('2026-02-26T15:00:00Z'); // UTC time
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownContainer = document.getElementById('countdown-container');

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }
    
    function updateCountdown() {
        // Get current time in UTC
        const now = new Date();
        
        // Calculate difference
        const difference = targetDate - now;
        
        if (difference <= 0) {
            // Date has passed - show confetti and hide countdown
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            if (countdownContainer) {
                countdownContainer.style.display = 'none';
            }
            
            // Trigger confetti effect
            triggerConfetti();
            return;
        }
        
        // Calculate time units
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update display
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }
    
    function triggerConfetti() {
        // Check if confetti library is loaded
        if (typeof confetti !== 'undefined') {
            // Create a confetti effect
            const duration = 5000; // 5 seconds
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };
            
            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }
            
            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                
                const particleCount = 50 * (timeLeft / duration);
                
                // Launch confetti from multiple positions
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);
        }
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
    
    // Check if date has passed on page load
    const now = new Date();
    if (targetDate - now <= 0) {
        triggerConfetti();
    }
});
