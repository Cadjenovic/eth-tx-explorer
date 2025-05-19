import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import "./GasBreakdownPie.css";

interface GasBreakdownPieProps {
    title: string;
    gasUsage: { name: string; usage: number }[];
}

const COLORS = [
    "#4e79a7",
    "#f28e2b",
    "#e15759",
    "#76b7b2",
    "#59a14f",
    "#edc948"
];

const GasBreakdownPie = ({ title, gasUsage }: GasBreakdownPieProps) => {
    return (
        <div className='pie-chart-wrapper'>
            <h3>{title}</h3>
            <ResponsiveContainer width='100%' height={280}>
                <PieChart>
                    <Pie
                        data={gasUsage}
                        dataKey='usage'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        outerRadius={80}
                        label={false}
                    >
                        {gasUsage.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign='bottom' height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GasBreakdownPie;
