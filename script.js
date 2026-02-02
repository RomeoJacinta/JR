// Custom Cursor - only for desktop
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        // Check if device supports hover (desktop)
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    cursorFollower.style.left = e.clientX + 'px';
                    cursorFollower.style.top = e.clientY + 'px';
                }, 100);
            });
            
            // Interactive elements effect for desktop only
            document.querySelectorAll('a, button, .attendance-option, .countdown-box, .color-palette-dot, .couple-photo, .stat-item, .event-card').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    cursor.style.borderColor = 'var(--sage)';
                    cursorFollower.style.transform = 'scale(1.5)';
                });
                
                element.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.borderColor = 'rgba(138, 154, 91, 0.5)';
                    cursorFollower.style.transform = 'scale(1)';
                });
            });
        }
        
        // Mobile Navigation Toggle
        const navToggle = document.getElementById('navToggle');
        const mobileNav = document.getElementById('mobileNav');
        const body = document.body;
        
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle('active');
            navToggle.innerHTML = mobileNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // Prevent body scroll when mobile nav is open
            if (mobileNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = '';
            }
        });
        
        // Close mobile nav when clicking a link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = '';
            });
        });
        
        // Close mobile nav on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = '';
            }
        });
        
        // Attendance Selection
        document.querySelectorAll('.attendance-option').forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                document.querySelectorAll('.attendance-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                option.classList.add('selected');
                
                // Update hidden input value
                document.getElementById('attendance').value = option.getAttribute('data-value');
            });
            
            // Add touch feedback for mobile
            option.addEventListener('touchstart', () => {
                option.style.opacity = '0.7';
            });
            
            option.addEventListener('touchend', () => {
                option.style.opacity = '';
            });
        });
        
        // Form Submission
        document.getElementById('rsvpForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const attendance = document.getElementById('attendance').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!attendance) {
                alert('Please select if you will be attending.');
                return;
            }
            
            // In a real application, you would send this data to a server
            const confirmationMessage = attendance === 'yes' 
                ? `Thank you ${name}! We're excited to celebrate with you and your ${guests} guest(s). We've sent a confirmation to ${email}.`
                : `Thank you for letting us know, ${name}. We'll miss you on our special day.`;
            
            alert(confirmationMessage);
            
            // Reset form
            document.getElementById('rsvpForm').reset();
            document.querySelectorAll('.attendance-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            document.getElementById('attendance').value = '';
        });
        
        // Countdown Timer
        function updateCountdown() {
            // Set the wedding date to March 7, 2026
            const weddingDate = new Date('March 7, 2026 10:00:00').getTime();
            const now = new Date().getTime();
            const timeRemaining = weddingDate - now;
            
            if (timeRemaining > 0) {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                
                // Update display with leading zeros
                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            } else {
                // If the wedding date has passed
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                document.querySelector('.section-title').textContent = "Today's The Day!";
            }
        }
        
        // Initialize countdown and update every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.style.padding = '0.8rem 5%';
                header.style.backdropFilter = 'blur(20px)';
                header.style.background = 'rgba(12, 12, 12, 0.95)';
            } else {
                header.style.padding = '1rem 5%';
                header.style.backdropFilter = 'blur(10px)';
                header.style.background = 'rgba(12, 12, 12, 0.9)';
            }
        });
        
        // Our Story section photo interactions - only for desktop
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            document.querySelectorAll('.couple-photo').forEach(photo => {
                photo.addEventListener('mouseenter', function() {
                    if (this.classList.contains('couple-photo-1')) {
                        this.style.transform = 'rotate(-1deg) scale(1.03)';
                    } else {
                        this.style.transform = 'rotate(2deg) scale(1.03)';
                    }
                    this.style.boxShadow = '0 35px 90px rgba(138, 154, 91, 0.3)';
                });
                
                photo.addEventListener('mouseleave', function() {
                    if (this.classList.contains('couple-photo-1')) {
                        this.style.transform = 'rotate(-3deg) scale(1)';
                    } else {
                        this.style.transform = 'rotate(4deg) scale(1)';
                    }
                    this.style.boxShadow = '0 25px 70px rgba(0, 0, 0, 0.4)';
                });
            });
            
            // Add hover effect to stats
            document.querySelectorAll('.stat-item').forEach(stat => {
                stat.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 10px 25px rgba(138, 154, 91, 0.2)';
                });
                
                stat.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
            });
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile nav if open
                    if (mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        body.style.overflow = '';
                    }
                    
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Color palette tooltip for mobile
        document.querySelectorAll('.color-palette-dot').forEach(dot => {
            dot.addEventListener('touchstart', function(e) {
                // Show color name on touch
                const colorName = this.getAttribute('data-color-name');
                if (colorName) {
                    const tooltip = document.createElement('div');
                    tooltip.textContent = colorName;
                    tooltip.style.position = 'fixed';
                    tooltip.style.background = 'rgba(0,0,0,0.8)';
                    tooltip.style.color = 'white';
                    tooltip.style.padding = '5px 10px';
                    tooltip.style.borderRadius = '5px';
                    tooltip.style.zIndex = '10000';
                    tooltip.style.left = e.touches[0].clientX + 'px';
                    tooltip.style.top = (e.touches[0].clientY - 40) + 'px';
                    tooltip.id = 'colorTooltip';
                    document.body.appendChild(tooltip);
                    
                    // Remove tooltip after 2 seconds
                    setTimeout(() => {
                        const existingTooltip = document.getElementById('colorTooltip');
                        if (existingTooltip) {
                            existingTooltip.remove();
                        }
                    }, 2000);
                }
            });
        });
        
        // Remove tooltip on touch end
        document.addEventListener('touchend', () => {
            const tooltip = document.getElementById('colorTooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            // Close mobile nav on orientation change
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = '';
            }
            
            // Give time for orientation to complete
            setTimeout(() => {
                // Force redraw of certain elements
                document.querySelectorAll('.photo-collage, .info-card-image, .fabric-image').forEach(el => {
                    el.style.display = 'none';
                    setTimeout(() => {
                        el.style.display = '';
                    }, 10);
                });
            }, 300);
        });
        
        // UPDATED: PORTRAIT ORIENTED OUTFIT LOOKBOARD CAROUSEL
        class OutfitCarousel {
            constructor() {
                this.carouselTrack = document.getElementById('carouselTrack');
                this.carouselIndicators = document.getElementById('carouselIndicators');
                this.prevBtn = document.getElementById('carouselPrev');
                this.nextBtn = document.getElementById('carouselNext');
                
                // Updated slides with portrait-oriented outfit images
                this.slides = [
                    {
                        image: "img/1-20250521091507.webp",
                        title: "Elegant Sage Gown",
                        description: "Floor-length dress with delicate lace accents",
                        type: "Formal Attire"
                    },
                    {
                        image: "img/sage-green-overshirt-striped-shirt-cream-trousers.jpg",
                        title: "Modern Suit in Sage",
                        description: "Contemporary suit with sage green jacket",
                        type: "Men's Formal"
                    },
                    {
                        image: "img/07-12-23-HarleySage-4.jpg",
                        title: "Chic Cocktail Dress",
                        description: "Midi dress in soft sage with subtle shimmer",
                        type: "Cocktail Attire"
                    },
                    {
                        image: "img/shirtsolreg-02-sagegrn-2_b32e023b-60c5-445f-a533-5db897a4dcf7.webp",
                        title: "Sophisticated Separates",
                        description: "Sage green top paired with neutral trousers",
                        type: "Smart Casual"
                    },
                    {
                        image: "img/uploaded_image_0_chxhd_1200x.webp",
                        title: "Romantic Floral Ensemble",
                        description: "Sage green dress with floral pattern accents",
                        type: "Garden Party"
                    },
                    {
                        image: "img/NHGC_hunter_green-closeup.webp",
                        title: "Classic Tailored Look",
                        description: "Timeless sage suit with modern cut",
                        type: "Tie Optional"
                    }
                ];
                
                this.currentSlide = 0;
                this.autoSlideInterval = null;
                this.autoSlideDelay = 5000; // 5 seconds
                
                this.init();
            }
            
            init() {
                // Create slides
                this.slides.forEach((slide, index) => {
                    const slideElement = document.createElement('div');
                    slideElement.className = 'carousel-slide';
                    slideElement.innerHTML = `
                        <img src="${slide.image}" alt="${slide.title}" loading="lazy">
                        <div class="slide-content">
                            <h3 class="slide-title">${slide.title}</h3>
                            <p class="slide-description">${slide.description}</p>
                            <span class="outfit-type">${slide.type}</span>
                        </div>
                    `;
                    this.carouselTrack.appendChild(slideElement);
                    
                    // Create indicator
                    const indicator = document.createElement('div');
                    indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
                    indicator.setAttribute('data-slide', index);
                    indicator.addEventListener('click', () => this.goToSlide(index));
                    this.carouselIndicators.appendChild(indicator);
                });
                
                // Add event listeners
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                
                // Add keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prevSlide();
                    if (e.key === 'ArrowRight') this.nextSlide();
                });
                
                // Add touch/swipe support for mobile
                this.addTouchSupport();
                
                // Start auto slide
                this.startAutoSlide();
                
                // Pause auto slide on hover (desktop only)
                if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                    this.carouselTrack.parentElement.addEventListener('mouseenter', () => this.stopAutoSlide());
                    this.carouselTrack.parentElement.addEventListener('mouseleave', () => this.startAutoSlide());
                }
            }
            
            addTouchSupport() {
                let startX = 0;
                let endX = 0;
                
                this.carouselTrack.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    this.stopAutoSlide();
                });
                
                this.carouselTrack.addEventListener('touchmove', (e) => {
                    endX = e.touches[0].clientX;
                });
                
                this.carouselTrack.addEventListener('touchend', () => {
                    const threshold = 50;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > threshold) {
                        if (diff > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                    }
                    
                    this.startAutoSlide();
                });
            }
            
            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateCarousel();
            }
            
            prevSlide() {
                this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
                this.updateCarousel();
            }
            
            nextSlide() {
                this.currentSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
                this.updateCarousel();
            }
            
            updateCarousel() {
                const track = this.carouselTrack;
                const slideWidth = 100; // Percentage
                track.style.transform = `translateX(-${this.currentSlide * slideWidth}%)`;
                
                // Update indicators
                const indicators = this.carouselIndicators.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentSlide);
                });
                
                // Reset auto slide timer
                this.resetAutoSlide();
            }
            
            startAutoSlide() {
                this.stopAutoSlide();
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, this.autoSlideDelay);
            }
            
            stopAutoSlide() {
                if (this.autoSlideInterval) {
                    clearInterval(this.autoSlideInterval);
                    this.autoSlideInterval = null;
                }
            }
            
            resetAutoSlide() {
                this.stopAutoSlide();
                this.startAutoSlide();
            }
        }
        
        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize lazy loading for images if needed
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            // Add loaded class to images when they load
            images.forEach(img => {
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', function() {
                        this.classList.add('loaded');
                    });
                }
            });
            
            // Initialize portrait outfit carousel
            new OutfitCarousel();
        });