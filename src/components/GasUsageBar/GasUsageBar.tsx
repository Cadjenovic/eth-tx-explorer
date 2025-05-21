import "./GasUsageBar.css";

interface GasUsageBarProps {
    gasUsed: number;
    gasLimit: number;
}

type Status = "low" | "medium" | "high";

const GasUsageBar = ({ gasUsed, gasLimit }: GasUsageBarProps) => {
    const percent = (gasUsed / gasLimit) * 100;

    let status: Status = "low";
    if (percent > 90) status = "high";
    else if (percent > 70) status = "medium";

    return (
        <div className='gas-bar-wrapper'>
            <h3>Gas Total Utilization</h3>
            <div className='gas-info'>
                <div className='gas-bar'>
                    <div
                        className={`gas-bar-fill gas-status-${status}`}
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <div className='gas-bar-label'>
                    {gasUsed} / {gasLimit} gas ({percent.toFixed(1)}%)
                </div>
            </div>
        </div>
    );
};

export default GasUsageBar;
