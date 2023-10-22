import { Injectable, NotFoundException } from '@nestjs/common';
import { pick } from 'lodash';
import { ReportType, data } from 'src/data';
import { ReportResponseDto } from 'src/dtos/report.dto';
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
    getAllReports(type: ReportType): ReportResponseDto[] {
        return data.report.filter((report) => report.type === type)
            .map(report => new ReportResponseDto(report));
    }

    getReportById(type: ReportType, id: string) {
        const report = data.report
            .filter((report) => report.type === type)
            .find((report) => report.id === id);
        if (!report) return;
        return new ReportResponseDto(report);
    }

    createReport(body: Report, type: ReportType) {
        const newReport = {
            id: uuid(),
            source: body.source,
            amount: body.amount,
            created_at: new Date(),
            updated_at: new Date(),
            type,
        };
        data.report.push(newReport);
        return new ReportResponseDto(newReport);
    }
    updateReport(body: UpdateReport, id: string) {
        let index: number;
        const report = data.report.find((report, idx) => {
            index = idx;
            return report.id === id;
        });

        if (!report) return;

        const updateData = pick(body, ['amount', 'source']);
        const updatedReport = {
            ...report,
            ...updateData,
        };

        data.report[index] = updatedReport;
        return new ReportResponseDto(updatedReport);
    }
    deleteReport(id: string) {
        let index: number;
        const report = data.report.find((report, idx) => {
            index = idx;
            return report.id === id;
        });

        if (!report) throw new NotFoundException('Report not found.');

        data.report.splice(index, 1);
        return;
    }
}
