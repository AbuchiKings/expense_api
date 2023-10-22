import { pick } from 'lodash';
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { ReportType, data } from "src/data";
import { ReportService } from './report.service';

@Controller('api/v1/report/:type')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Get()
    getAllReports(@Param('type') type: ReportType) {
        return this.reportService.getAllReports(type)
    }

    @Get(':id')
    getReport(@Param('type') type: ReportType, @Param('id') id: string,) {
        return this.reportService.getReportById(type, id)
    }

    @Post()
    createReport(@Body() body: { source: string, amount: number }, @Param('type') type: ReportType) {
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

    @Patch(':id')
    updateReport(@Body() body: { source?: string, amount?: number }, @Param('id') id: string, @Param('type') type: ReportType) {
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

    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('id') id: string) {
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