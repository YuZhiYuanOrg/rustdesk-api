import { Controller, Get, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { QueryReviewDto } from './dtos/query-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async findAll(@Query() query: QueryReviewDto) {
    return { success: true, data: await this.reviewService.findAll(query) };
  }
}
