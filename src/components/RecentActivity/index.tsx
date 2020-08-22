import React from "react";
import { Container, Content, Card, Title } from "./styles";
import { IConsultancy } from "../../types/index";
interface IScheduleOverviewProps {
  consultancies?: IConsultancy[];
}

export default function index({ consultancies }: IScheduleOverviewProps) {
  return (
    <Container>
      <Title>Recent Activity</Title>
      <Content>
        {consultancies ? (
          consultancies.map(() => {})
        ) : (
          <h3>There are no recent consultations.</h3>
        )}
      </Content>
    </Container>
  );
}
