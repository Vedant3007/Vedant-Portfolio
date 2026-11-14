export const heroContent = {
  headline: "Reliable systems, from the service desk to the cloud.",
  summary:
    "Computer Science graduate with hands-on experience in enterprise IT operations across 16 sites, AWS infrastructure and containerised application deployment.",
  stats: [
    { value: "16", label: "Australian sites supported" },
    { value: "60+", label: "Incidents resolved monthly, within SLA" },
    { value: "99.87%", label: "Uptime I contributed to" },
  ],
} as const;

export type CapabilityIcon = "server" | "cloud" | "container" | "code";

export const capabilities: ReadonlyArray<{
  icon: CapabilityIcon;
  title: string;
  description: string;
}> = [
  {
    icon: "server",
    title: "Enterprise IT operations",
    description:
        "L1-L3 support across 16 sites using ServiceNow and BMC Remedy, with Active Directory, Microsoft 365, Citrix VDI and endpoint provisioning.",
  },
  {
    icon: "cloud",
    title: "Cloud infrastructure",
    description:
      "AWS networking, compute and databases automated with CloudFormation: VPCs, Auto Scaling, load balancing and Multi-AZ RDS.",
  },
  {
    icon: "container",
    title: "Containers and monitoring",
    description:
      "Docker and Kubernetes on Ubuntu, with Prometheus, Grafana and Fluentd for monitoring and log aggregation.",
  },
  {
    icon: "code",
    title: "Software engineering",
    description:
      "Full-stack development with React, Node.js and PostgreSQL, plus algorithm work in Python.",
  },
];