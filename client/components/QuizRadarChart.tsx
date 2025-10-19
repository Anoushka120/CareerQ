import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  data: { skill: string; score: number }[];
};

export default function QuizRadarChart({ data }: Props) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <RadarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "#fff" }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#fff" }} />
          <Radar name="You" dataKey="score" stroke="var(--chart-2)" fill="var(--chart-1)" fillOpacity={0.5} />
          <Tooltip contentStyle={{ background: "rgba(0,0,0,0.6)", border: "1px solid var(--border)", color: "#fff" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
