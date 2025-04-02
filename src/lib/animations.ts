
// Animation utility functions for AthleteGuard AI

/**
 * Animate a number from start to end
 * @param start Starting number
 * @param end End number
 * @param duration Duration in milliseconds
 * @param callback Function to call with the current value
 */
export const animateNumber = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
) => {
  const startTime = performance.now();
  
  const update = () => {
    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function: easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    
    const value = start + (end - start) * eased;
    callback(value);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      callback(end);
    }
  };
  
  requestAnimationFrame(update);
};

/**
 * Stagger the animation of multiple elements
 * @param selector CSS selector for the elements
 * @param animationClass CSS class to add for animation
 * @param staggerDelay Delay between each element animation in milliseconds
 */
export const staggerAnimation = (
  selector: string,
  animationClass: string,
  staggerDelay: number = 100
) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add(animationClass);
    }, index * staggerDelay);
  });
};

/**
 * Parallax scroll effect
 * @param element Element to apply parallax to
 * @param speed Speed of parallax (1 is normal speed)
 */
export const applyParallax = (element: HTMLElement, speed: number = 0.5) => {
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const offset = scrollTop * speed;
    const transform = `translateY(${offset}px)`;
    
    element.style.transform = transform;
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Return a cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
