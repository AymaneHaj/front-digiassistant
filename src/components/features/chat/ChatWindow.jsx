import { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ChatWindow (Dumb Component)
 * Renders the list of messages and the input box.
 * Handles auto-scrolling to the bottom.
 */
const TOTAL_QUESTIONS = 72; // Total number of diagnostic questions

export default function ChatWindow({ history, isLoading, onSendMessage }) {
    const messagesEndRef = useRef(null);
    const isInitialMount = useRef(true);

    // Auto-scroll to the bottom when history changes
    useEffect(() => {
        if (messagesEndRef.current) {
            // On initial mount with existing history, use a slight delay to ensure DOM is ready
            if (isInitialMount.current && history.length > 0) {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                });
                isInitialMount.current = false;
            } else {
                // For subsequent history changes, scroll immediately
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [history]);

    // Calculate progress: count answered questions (user messages)
    const answeredQuestions = history.filter(msg => msg.role === 'user').length;
    const progressPercentage = Math.min(Math.round((answeredQuestions / TOTAL_QUESTIONS) * 100), 100);

    return (
        <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-lg sm:rounded-xl md:rounded-3xl overflow-hidden border border-gray-200/50 mobile-chat-window" style={{ minHeight: 0 }}>
            {/* Progress Bar */}
            <div className="px-3 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3 bg-gradient-to-r from-primary-50/50 via-white to-blue-50/50 border-b border-gray-200/50">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#343A40]">
                        Progression du diagnostic
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#008C9E]">
                        {progressPercentage}%
                    </span>
                </div>
                <div className="w-full h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#008C9E] to-[#006b7a] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>
                <div className="flex items-center justify-between mt-1 sm:mt-1.5">
                    <span className="text-[10px] sm:text-xs text-gray-500">
                        {answeredQuestions} / {TOTAL_QUESTIONS} questions répondues
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                        {TOTAL_QUESTIONS - answeredQuestions} restantes
                    </span>
                </div>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-2.5 sm:p-4 md:p-6 space-y-2.5 sm:space-y-4 md:space-y-5 scrollbar-thin mobile-messages-area" style={{ WebkitOverflowScrolling: 'touch' }}>
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-3 sm:mb-4">
                            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500 animate-spin" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium">Starting conversation...</p>
                    </div>
                ) : (
                    <>
                        {history.map((msg, index) => (
                            <ChatBubble
                                key={index}
                                role={msg.role}
                                content={msg.content}
                                score={msg.score}
                                evaluation={msg.evaluation}
                            />
                        ))}
                        {/* This empty div is the target for auto-scrolling */}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200/50 bg-gradient-to-r from-primary-50/30 via-white to-blue-50/30 backdrop-blur-sm p-2.5 sm:p-3 md:p-4 lg:p-5 flex-shrink-0 mobile-input-area">
                <ChatInput onSend={onSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
}