import './TriStateMultiChoice.scss';
import {unique} from '@app/utils';

export default function TriStateMultiChoice({options, included, excluded, onChange}: {
    options?: string[];
    included: string[];
    excluded: string[];
    onChange: (included: string[], excluded: string[]) => void;
}) {
    const handleClick = (option: string, state: string) => {
        if (state === 'included') {
            onChange(included.filter(o => o !== option), unique([option, ...excluded]));
        } else if (state === 'excluded') {
            onChange(included.filter(o => o !== option), excluded.filter(o => o !== option));
        } else {
            onChange(unique([...included, option]), excluded.filter(o => o !== option));
        }
    };

    if (!options) {
        options = included.concat(excluded);
    }

    return (
        <div className="tristatemultichoice">
            {
                options.map((option: string, index: number) => {
                    const isIncluded = included.includes(option);
                    const isExcluded = excluded.includes(option);
                    const state = isIncluded ? 'included' : isExcluded ? 'excluded' : 'none';
                    return (
                        <div className={`tristatemultichoice__option ${state}`}
                             key={index}
                             onClick={() => {
                                 handleClick(option, state);
                             }}
                        >{option}</div>
                    );
                })
            }
        </div>
    );
}