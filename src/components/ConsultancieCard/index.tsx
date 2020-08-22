import React from "react";
import { IConsultancy } from "../../types/index";

export default function index({ topic, client, date }: IConsultancy) {
  return (
    <div>
      {topic}
      {client}
      {date}
    </div>
  );
}
