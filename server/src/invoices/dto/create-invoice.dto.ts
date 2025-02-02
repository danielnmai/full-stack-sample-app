import { ApiProperty } from '@nestjs/swagger';
export class CreateInvoiceDto {
  @ApiProperty()
  vendorName: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false, default: false })
  paid?: boolean = false;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  dueDate: Date;
}
