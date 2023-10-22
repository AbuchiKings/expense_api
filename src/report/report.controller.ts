import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    ParseUUIDPipe,
    ParseEnumPipe,
    NotFoundException,
} from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from './report.service';
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from 'src/dtos/report.dto';

@Controller('api/v1/report/:type')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Get()
    getAllReports(
        @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    ): ReportResponseDto[] {
        return this.reportService.getAllReports(type);
    }

    @Get(':id')
    getReport(
        @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        const report = this.reportService.getReportById(type, id);
        if (!report) throw new NotFoundException('Report not found.');
        return report;
    }

    @Post()
    createReport(
        @Body() body: CreateReportDto,
        @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    ) {
        return this.reportService.createReport(body, type);
    }

    @Patch(':id')
    updateReport(
        @Body() body: UpdateReportDto,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        const report = this.reportService.updateReport(body, id);
        if (!report) throw new NotFoundException('Report not found.');
        return report;
    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('id', ParseUUIDPipe) id: string) {
        return this.reportService.deleteReport(id);
    }
}
