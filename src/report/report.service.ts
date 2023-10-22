import { Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import { ReportType, data } from "src/data";
import { v4 as uuid } from 'uuid';

interface Report {
    amount: number;
    source: string;
}

interface UpdateReport {
    amount?: number;
    source?: string;
}
@Injectable()
export class ReportService {
    getAllReports(type: ReportType) {
        return data.report.filter(report => report.type === type);
    }
    getReportById(type: ReportType, id: string) {
        return data.report
            .filter(report => report.type === type)
            .find(report => report.id === id);
    }
    createReport(body: Report, type: ReportType) {
        const newReport = {
            id: uuid(),
            source: body.source,
            amount: body.amount,
            created_at: new Date(),
            updated_at: new Date(),
            type
        }
        data.report.push(newReport);
        return newReport;
    }
    updateReport(body: UpdateReport, id: string, type: ReportType,) {
        let index: number;
        let report = data.report
            .find((report, idx) => {
                index = idx;
                return report.id === id
            });

        if (!report) throw new NotFoundException('Report not found.');

        let updateData = pick(body, ['amount', 'source']);
        let updatedReport = {
            ...report,
            ...updateData
        }

        data.report[index] = updatedReport;
        return updatedReport;
    }
    deleteReport(id: string) {
        let index: number;
        let report = data.report
            .find((report, idx) => {
                index = idx;
                return report.id === id
            });

        if (!report) throw new NotFoundException('Report not found.');

        data.report.splice(index, 1)
        return;
     }
}