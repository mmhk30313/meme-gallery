import React from "react";
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Link from "antd/lib/typography/Link";
// import { alpha } from '@material-ui/core/styles';

const Stats = ({memes}: any) => {
    // console.log({memes});
    const dates = [...Array(7)].map((_, i) => {
        const d: any = new Date();
        d.setDate(d.getDate() - i);
        // const day = d.getDate();
        // const x = d.toDateString().substr(4, 3);
        // const year = d.getFullYear().toString().substr(2);
        // console.log({year});
        const date = `${d.getDate()} ${d.toDateString().substr(4, 3)} ${d.getFullYear().toString().substr(2)}`;
        return date;
        // return new Date(d).toLocaleDateString("en-US");
    })
    // console.log({dates});
    // Sample data
    let data: any[] = []; // { argument: '3/9/2021', value: 10 },

    const counts: any = {};
    const sampleArray = memes?.map((meme: any) => meme?.createdAt.substr(0, (meme?.createdAt.length - 4))+meme?.createdAt.substr(meme?.createdAt.length -2));
    sampleArray.forEach(function (x: any) { counts[x] = (counts[x] || 0) + 1; });
    // console.log({counts});
    // const keys = Object.keys(counts);
    // keys?.map((key: any) => {
    //     data.push({argument: key, value: counts[key]})
    // });
    dates?.map((date: any) =>{
        data.push({argument: date, value: counts[date] || 0});
        // counts[date] && data.push({argument: date, value: counts[date]});
    });
    // console.log({data});
    data = data?.reverse();
    return (
        <div className="mt-2 px-3 py-5 mx-auto">
            <Paper className="my-0 p-4 text-warning rounded shadow">
                <Chart
                    data={data}
                >
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries valueField="value" argumentField="argument" />
                </Chart>
            </Paper>
        </div>
    );
}

export default Stats;