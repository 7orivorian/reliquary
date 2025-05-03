import './CompletableTextInput.scss';
import {useState} from 'react';

export default function CompletableTextInput({
                                                 value,
                                                 suggestions, suggestionLimit = 8, suggestionMatchOffset,
                                                 placeholder,
                                                 onChange,
                                                 onEnter,
                                             }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sanValue: string = value.toLowerCase().substring(suggestionMatchOffset || 0);
    const validSuggestions: string[] = suggestions
            .filter((suggestion: string): boolean => suggestion.toLowerCase().startsWith(sanValue))
            .slice(0, suggestionLimit || suggestions.length);

    const handleChange = (value: string) => {
        onChange(value.trimStart());
        setCurrentIndex(0);
    };

    const handleKeyDown = (e: any) => {
        switch (e.key) {
            case 'Tab':
                e.preventDefault();
                e.stopPropagation();
                const suggest: string = validSuggestions[currentIndex] || '';
                if (suggestionMatchOffset && suggestionMatchOffset > 0) {
                    handleChange(value.substring(0, suggestionMatchOffset).concat(suggest));
                } else {
                    handleChange(suggest);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex((currentIndex + 1) % validSuggestions.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex((currentIndex - 1 + validSuggestions.length) % validSuggestions.length);
                break;
            case 'Enter':
                e.preventDefault();
                e.stopPropagation();
                onEnter && onEnter(value);
                break;
            default:
                break;
        }
    };

    const hasSuggestions: boolean = sanValue.length > 0 && validSuggestions.length > 0;
    return (
            <div>
                <input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                />
                <div className={`completable-text-input__suggestions${hasSuggestions ? '' : ' hidden'}`}>
                    {validSuggestions
                            .map((suggestion: string, index: number) => {
                                return (
                                        <span className={currentIndex === index ? 'active' : ''}
                                              key={suggestion}
                                              onClick={() => handleChange(suggestion)}
                                        >{suggestion}</span>
                                );
                            })
                    }
                </div>
            </div>
    );
}

type Props = {
    value: string;
    suggestions: string[];
    suggestionLimit?: number;
    suggestionMatchOffset?: number;
    placeholder?: string;
    onChange: (value: string) => void;
    onEnter?: (value: string) => void;
}