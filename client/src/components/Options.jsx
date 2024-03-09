import classnames from 'classnames';

const Options = ({ options, clicked, setClicked }) => {
    

    const handleClick = (index) => {
        console.log(index);
        setClicked(index);
    };

    return (
        <div className={`mx-24 grid grid-cols-2 my-6 gap-3`}>
            {options?.map((option, index) => (
                <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className={classnames(
                        'my-2 w-full h-14 bg-purple-300 py-4 px-2 border-l-4 border-purple-950 cursor-pointer',
                        { 'bg-purple-500': clicked === index,}
                    )}
                >
                    {option}
                </div>
            ))}
        </div>
    );
}

export default Options;
