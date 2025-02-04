import { ApiProperty } from '@nestjs/swagger';
import { Invoice } from '@prisma/client';

export class InvoiceEntity implements Invoice {
  @ApiProperty()
  id: number;

  @ApiProperty()
  vendorName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  paid: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
