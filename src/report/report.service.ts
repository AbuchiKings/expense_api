import { Injectable } from "@nestjs/common";
import { ReportType, data } from "src/data";

@Injectable()
export class ReportService {
    getAllReports(type: ReportType){  
        return data.report.filter(report => report.type === type);
    }
    getReportById(type:ReportType, id: string){
        return data.report
        .filter(report => report.type === type)
        .find(report => report.id === id);
    }
    createReport(){}
    updateReport(){}
    deleteReport(){}
}