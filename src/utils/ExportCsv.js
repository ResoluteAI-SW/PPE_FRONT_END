import React from "react";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    ButtonStyle: {
        border: "none",
        backgroundColor: "transparent"
    },
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));


export const ExportCSV = ({ csvData, fileName }) => {
    const classes = useStyles();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button className={classes.ButtonStyle} onClick={(e) => exportToCSV(csvData, fileName)}><CloudDownloadIcon /></Button>

    )
}