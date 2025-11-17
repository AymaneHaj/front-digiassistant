import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Mic, MicOff, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ChatInput (Dumb Component)
 * Renders the form for sending a new message.
 */
export default function ChatInput({ onSend, isLoading }) {
    const [message, setMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const recognitionRef = useRef(null);
    const textareaRef = useRef(null);
    const prevIsLoadingRef = useRef(isLoading);
    const inputContainerRef = useRef(null);

    // Clear input and auto-focus when loading finishes (response received)
    // This ensures the input stays empty and is ready for typing after receiving the AI response
    useEffect(() => {
        // If isLoading changed from true to false (response received), clear input and focus
        if (prevIsLoadingRef.current === true && isLoading === false) {
            setMessage('');
            // Auto-focus the textarea after a short delay to ensure it's ready
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 100);
        }
        prevIsLoadingRef.current = isLoading;
    }, [isLoading]);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle keyboard on mobile - adjust input position
    useEffect(() => {
        if (!isMobile) {
            setKeyboardHeight(0);
            return;
        }

        const handleViewportResize = () => {
            if (window.visualViewport) {
                // Calculate keyboard height using visual viewport
                const viewportHeight = window.visualViewport.height;
                const windowHeight = window.innerHeight;
                const calculatedKeyboardHeight = windowHeight - viewportHeight;
                
                // Only update if keyboard is actually visible (threshold: 50px)
                if (calculatedKeyboardHeight > 50) {
                    setKeyboardHeight(calculatedKeyboardHeight);
                } else {
                    setKeyboardHeight(0);
                }
            }
        };

        // Listen to visual viewport changes (keyboard)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleViewportResize);
            window.visualViewport.addEventListener('scroll', handleViewportResize);
        }

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', handleViewportResize);
                window.visualViewport.removeEventListener('scroll', handleViewportResize);
            }
        };
    }, [isMobile]);

    // Check if Speech Recognition is supported
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSupported(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'fr-FR'; // French language

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setMessage(prev => prev + (prev ? ' ' : '') + transcript);
                setIsListening(false);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                if (event.error === 'no-speech') {
                    alert('Aucune parole détectée. Veuillez réessayer.');
                } else if (event.error === 'not-allowed') {
                    alert('Permission microphone refusée. Veuillez autoriser l\'accès au microphone.');
                }
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
            } catch (error) {
                console.error('Error starting speech recognition:', error);
            }
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (message.trim() && !isLoading) {
            stopListening(); // Stop listening if active
            onSend(message.trim());
            setMessage(''); // Clear input after sending
        }
    };

    return (
        <form 
            ref={inputContainerRef}
            onSubmit={handleSubmit} 
            className="flex items-center gap-1.5 sm:gap-2 transition-all duration-300 ease-out" 
            style={{ 
                transform: keyboardHeight > 0 && isMobile 
                    ? `translateY(-${Math.min(keyboardHeight, 300)}px)` 
                    : 'translateY(0)',
                position: isMobile ? 'relative' : 'static'
            }}
            noValidate
        >
            <div className="flex-1 relative">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        // Send on Enter, new line on Shift+Enter
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    rows="1"
                    className="w-full resize-none rounded-xl sm:rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200 px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-base placeholder:text-gray-400"
                    placeholder={isLoading ? 'Envoi en cours...' : isListening ? '🎤 Écoute...' : 'Tapez votre réponse...'}
                    disabled={isListening}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                {isListening && (
                    <div className="absolute top-1/2 right-2 sm:right-3 transform -translate-y-1/2 flex items-center gap-1.5 sm:gap-2 z-10">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] sm:text-xs text-red-500 font-medium hidden sm:inline">Enregistrement...</span>
                    </div>
                )}
            </div>
            
            {/* Microphone Button */}
            {isSupported && (
                <motion.button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    disabled={isLoading}
                    className={`
                        flex-shrink-0
                        w-10 h-10 sm:w-12 sm:h-12
                        rounded-full
                        self-center
                        ${isListening 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-gray-200 hover:bg-gray-300'
                        }
                        text-white
                        shadow-lg
                        hover:shadow-xl
                        transition-all duration-200
                        flex items-center justify-center
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    `}
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    title={isListening ? 'Arrêter l\'enregistrement' : 'Commencer l\'enregistrement vocal'}
                >
                    {isListening ? (
                        <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                        <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    )}
                </motion.button>
            )}

            {/* Send Button */}
            <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !message.trim() || isListening}
                className={`
                    flex-shrink-0
                    w-10 h-10 sm:w-12 sm:h-12
                    rounded-full
                    self-center
                    bg-gradient-to-r from-primary-600 to-primary-700
                    hover:from-primary-700 hover:to-primary-800
                    text-white
                    shadow-lg
                    hover:shadow-xl
                    transition-all duration-200
                    flex items-center justify-center
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    disabled:hover:shadow-lg
                `}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
            </motion.button>
        </form>
    );
}