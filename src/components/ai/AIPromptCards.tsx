import styles from './AIChat.module.css';
import { useAI } from '../../hooks/useAI';

const SUGGESTED_PROMPTS = [
  "Create a Tree Plantation event next Sunday in Pune.",
  "Find 20 volunteers skilled in First Aid.",
  "Predict attendance for tomorrow.",
  "Generate last month's attendance report."
];

export function AIPromptCards() {
  const { sendMessage, isTyping } = useAI();

  return (
    <div className={styles.suggestions}>
      {SUGGESTED_PROMPTS.map((prompt, i) => (
        <button
          key={i}
          className={styles.suggestionBadge}
          onClick={() => sendMessage(prompt)}
          disabled={isTyping}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
