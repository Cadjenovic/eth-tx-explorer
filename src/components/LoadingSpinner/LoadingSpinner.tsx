import "./LoadingSpinner.css";

interface Props {
    text?: string;
}

const LoadingSpinner: React.FC<Props> = ({ text = "Loading..." }) => {
    return (
        <div className='spinner-wrapper'>
            <div className='spinner' />
            <p>Loading {text}...</p>
        </div>
    );
};

export default LoadingSpinner;
