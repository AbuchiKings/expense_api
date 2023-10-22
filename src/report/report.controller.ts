import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
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
        return this.reportService.createReport(body, type);
    }

    @Patch(':id')
    updateReport(@Body() body: { source?: string, amount?: number }, @Param('id') id: string, @Param('type') type: ReportType) {
        return this.reportService.updateReport(body, id, type)
    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('id') id: string) {
        return this.reportService.deleteReport(id);
    }

}