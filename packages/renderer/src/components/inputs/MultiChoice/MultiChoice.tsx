import './MultiChoice.scss';

export default function MultiChoice({options, selected, requireOne = false, onChange}: {
    options: string[];
    selected: string[];
    requireOne?: boolean;
    onChange: (selected: string[]) => void;
}) {

    const handleClick = (option: string) => {
        if (requireOne && selected.length === 1 && selected[0] === option) {
            return;
        }
        const newSelected: string[] = [...selected];
        if (newSelected.includes(option)) {
            newSelected.splice(newSelected.indexOf(option), 1);
        } else {
            newSelected.push(option);
        }
        onChange(newSelected);
    };

    return (
        <div className="multichoice">
            {
                options.map((option: string, index: number) => {
                    return (
                        <div className={`multichoice__option ${selected.includes(option) ? 'selected' : ''}`}
                             key={index}
                             onClick={() => handleClick(option)}
                        >{option}</div>
                    );
                })
            }
        </div>
    );
}