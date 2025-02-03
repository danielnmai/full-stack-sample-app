import {
  Container,
  Group,
  Modal,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store.ts";
import { fetchInvoices } from "../reducers/invoicesSlice.ts";
import { Invoice } from "../schemas/invoice.ts";

const InvoiceList = () => {
  const { status, invoices } = useSelector(
    (state: RootState) => state.invoices
  );
  const { userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchInvoices(userId!));
    }
  }, [dispatch, status, userId]);

  const formattedDate = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const formattedAmount = (amount?: number) => {
    if (!amount) return 0;

    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  const rows = invoices.map((invoice) => (
    <Table.Tr key={invoice.id} onClick={() => onOpenModal(invoice)}>
      <Table.Td>{formattedDate(invoice.createdAt)}</Table.Td>
      <Table.Td>{invoice.vendorName}</Table.Td>
      <Table.Td>{invoice.description}</Table.Td>
      <Table.Td>{formattedDate(invoice.dueDate)}</Table.Td>
      <Table.Td>{formattedAmount(invoice.amount)}</Table.Td>
      <Table.Td>{invoice.paid ? "Paid" : "Open"}</Table.Td>
    </Table.Tr>
  ));

  const onOpenModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    open();
  };

  const onCloseModal = () => {
    setSelectedInvoice(null);
    close();
  };

  return (
    <Container>
      <Table highlightOnHover>
        <Table.Thead className="bg-blue-100">
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Payee</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Due Date</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Modal
        opened={opened}
        onClose={onCloseModal}
        title={<Title order={3}>Invoice Details</Title>}
        overlayProps={{
          backgroundOpacity: 0.3,
        }}
      >
        <Container m={10}>
          <Stack>
            <Group>
              <Text miw={120} fw={700}>
                Created At:
              </Text>
              <Text>{formattedDate(selectedInvoice?.createdAt)}</Text>
            </Group>
            <Group>
              <Text miw={120} fw={700}>
                Updated At:
              </Text>
              <Text>{formattedDate(selectedInvoice?.updatedAt)}</Text>
            </Group>
            <Group>
              <Text miw={120} fw={700}>
                Vendor Name:
              </Text>
              <Text>{selectedInvoice?.vendorName}</Text>
            </Group>
            <Group>
              <Text miw={120} fw={700}>
                Description:
              </Text>
              <Text>{selectedInvoice?.description}</Text>
            </Group>
            <Group>
              <Text miw={120} fw={700}>
                Due Date:
              </Text>
              <Text>{formattedDate(selectedInvoice?.dueDate)}</Text>
            </Group>
            <Group>
              <Text miw={120} fw={700}>
                Amount:
              </Text>
              <Text>{formattedAmount(selectedInvoice?.amount)}</Text>
            </Group>
            <Group>
              <Text miw={120} fw={700}>
                Status:
              </Text>
              <Text>{selectedInvoice?.paid ? "Paid" : "Open"}</Text>
            </Group>
          </Stack>
        </Container>
      </Modal>
    </Container>
  );
};

export default InvoiceList;
