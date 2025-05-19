import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import "./GasTimelineHistogram.css";

interface GasTimelineHistogramProps {
    stepUsage: { name: string; usage: number }[];
}

const GasTimelineHistogram = ({ stepUsage }: GasTimelineHistogramProps) => {
    return (
        <div className='histogram-wrapper'>
            <h3>Gas Consumption by Trace Step</h3>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart
                    data={stepUsage}
                    margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                >
                    <XAxis dataKey='name' interval={0} tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='usage' fill='#4e6ef2' name='Gas Used' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GasTimelineHistogram;
