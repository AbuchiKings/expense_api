import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { ReportService } from 'src/report/report.service';

@Module({
  providers: [SummaryService, ReportService],
  controllers: [SummaryController]
})
export class SummaryModule {}
