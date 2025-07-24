import { useEffect, useRef, useState } from "react";
import styles from "../Styles/select.module.css";

function Select({ multiple, value, onChange, options, optionType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);

  function selectOption(option) {
    if (multiple) {
      const updatedValues = Array.isArray(value)
        ? value.some((o) => o.title === option.title)
          ? value.filter((o) => o.title !== option.title)
          : [...value, option]
        : [option];
      onChange(updatedValues, value);
    } else {
      if (option !== value) {
        onChange(option, value);
      }
    }
  }

  function isOptionSelected(option) {
    return multiple
      ? value?.some((o) => o.title === option.title)
      : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{isOpen ? "" : optionType}</span>
      <div className={`${styles.caret} ${isOpen ? styles.open : ""}`}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options?.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.id}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option?.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
