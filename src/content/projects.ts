export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  tech: readonly string[];
  emphasis: "primary" | "supporting";
  published: boolean; // set to true once the case-study page exists
};

export const projects: readonly Project[] = [
  {
    slug: "aws-wordpress-deployment",
    title: "Cloud-Based WordPress Deployment on AWS",
    category: "Cloud · Infrastructure",
    summary:
      "A highly available WordPress deployment automated with CloudFormation: a custom VPC with public and private subnets, Auto Scaling behind an Application Load Balancer, and a Multi-AZ RDS database with read replicas.",
    tech: ["AWS", "CloudFormation", "VPC", "RDS", "Auto Scaling", "ALB"],
    emphasis: "primary",
    published: false,
  },
  {
    slug: "hospital-appointment-system",
    title: "Hospital Appointment Booking System",
    category: "Systems · Containers",
    summary:
      "A six-microservice booking application containerised with Docker and deployed to a Kubernetes cluster on Ubuntu, with Prometheus, Grafana and Fluentd for monitoring and logs.",
    tech: ["Kubernetes", "Docker", "Linux", "Prometheus", "Grafana", "PostgreSQL"],
    emphasis: "primary",
    published: false,
  },
  {
    slug: "accessibility-pathfinding",
    title: "Accessibility-Aware Pathfinding Tool",
    category: "Software · Algorithms",
    summary:
      "An interactive Python route planner that finds wheelchair- and mobility-friendly paths over real street networks, using Dijkstra’s and A* search with accessibility-aware heuristics.",
    tech: ["Python", "NetworkX", "A*", "Dijkstra", "Tkinter", "Matplotlib"],
    emphasis: "supporting",
    published: false,
  },
];