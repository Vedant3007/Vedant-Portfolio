export type Tier = {
  label: string;
  /** Set to false to show no arrow after this tier. */
  connectsToNext?: boolean;
  nodes: ReadonlyArray<{ name: string; detail?: string }>;
};

export type Section =
  | {
      kind: "text";
      title: string;
      paragraphs?: readonly string[];
      bullets?: readonly string[];
    }
  | { kind: "highlights"; title: string }
  | { kind: "architecture"; title: string; caption: string; tiers: readonly Tier[] }
  | {
      kind: "table";
      title: string;
      intro?: string;
      columns: readonly string[];
      rows: ReadonlyArray<readonly string[]>;
    }
  // Use this for a real diagram or screenshot, e.g.
  // { kind: "image", title: "Architecture diagram", src: "/images/projects/aws-diagram.png", alt: "...", caption: "..." }
  | { kind: "image"; title: string; src: string; alt: string; caption: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  highlights: readonly string[];
  demonstrates: readonly string[];
  tech: readonly string[];
  emphasis: "primary" | "supporting";
  /** Cover image, e.g. "/images/projects/aws-wordpress-deployment.jpg". null shows a placeholder. */
  image: string | null;
  imageAlt: string;
  stats: ReadonlyArray<{ value: string; label: string }>;
  sections: readonly Section[];
  /** TODO: replace the example URL with the real repository link. */
  repoUrl: string;
};

export const projects: readonly Project[] = [
  {
    slug: "aws-wordpress-deployment",
    title: "Cloud-Based WordPress Deployment on AWS",
    category: "Cloud · Infrastructure",
    summary:
      "A highly available WordPress deployment on AWS, automated end to end with CloudFormation: a custom VPC with public and private subnets, Auto Scaling behind an Application Load Balancer, and a Multi-AZ RDS database with read replicas.",
    highlights: [
      "Designed and provisioned a custom VPC with public and private subnets, NAT and Internet Gateways, route tables, Elastic IPs and IAM policies, automating the full deployment with AWS CloudFormation.",
      "Configured a highly available Amazon RDS (MySQL) database with Multi-AZ failover and read replicas.",
      "Used Amazon S3 for offloaded media storage.",
      "Deployed EC2 launch templates in an Auto Scaling Group with a custom AMI behind an Application Load Balancer.",
      "Tested failover, scaling and recovery end to end.",
    ],
    demonstrates: [
      "AWS infrastructure provisioning",
      "Cloud networking and network segmentation",
      "High availability",
      "Infrastructure as Code",
      "Compute management and load balancing",
      "Database availability and storage integration",
      "Cloud security with IAM",
      "Infrastructure testing",
    ],
    tech: [
      "EC2",
      "RDS MySQL",
      "S3",
      "VPC",
      "CloudFormation",
      "Application Load Balancer",
      "Auto Scaling",
      "IAM",
      "NAT Gateway",
      "Internet Gateway",
      "Route Tables",
      "Elastic IP",
    ],
    emphasis: "primary",
    image: "/images/projects/aws-wordpress-deployment.jpg",
    imageAlt: "Illustration representing a cloud infrastructure deployment on AWS",
    stats: [
      { value: "12", label: "AWS services and components" },
      { value: "Multi-AZ", label: "Database failover with read replicas" },
      { value: "IaC", label: "Full deployment automated with CloudFormation" },
    ],
    sections: [
      // VERIFY: framing of the problem and objectives.
      {
        kind: "text",
        title: "Problem and objectives",
        paragraphs: [
          "A single WordPress server is a single point of failure. If the instance, its database or its network path fails, the site goes offline, and one server cannot absorb a sudden increase in traffic. The goal of this project was to deploy WordPress on AWS in a way that removes those weaknesses and can be recreated reliably from code.",
        ],
        bullets: [
          "Separate public-facing and internal resources using a segmented network.",
          "Keep the site available when a database or compute component fails.",
          "Scale compute capacity up and down automatically.",
          "Keep servers replaceable by moving media storage off the instances.",
          "Provision the whole environment as code so it is repeatable.",
          "Test failover, scaling and recovery end to end.",
        ],
      },
      { kind: "highlights", title: "What I built" },
      {
        kind: "architecture",
        title: "Architecture overview",
        caption:
          "A layered view of the components in the deployment and how responsibility flows between them.",
        tiers: [
          {
            label: "Network foundation",
            nodes: [
              { name: "Custom VPC", detail: "Public and private subnets" },
              { name: "Internet Gateway", detail: "Connects the VPC to the internet" },
              { name: "NAT Gateway", detail: "Outbound access for private resources" },
              { name: "Route Tables · Elastic IPs", detail: "Traffic paths and fixed public addresses" },
            ],
          },
          {
            label: "Traffic and compute",
            nodes: [
              { name: "Application Load Balancer", detail: "Distributes incoming requests" },
              {
                name: "Auto Scaling Group",
                detail: "EC2 instances from a launch template with a custom AMI",
              },
            ],
          },
          {
            label: "Data and storage",
            connectsToNext: false,
            nodes: [
              { name: "Amazon RDS for MySQL", detail: "Multi-AZ failover" },
              { name: "Read replicas", detail: "Offload read traffic" },
              { name: "Amazon S3", detail: "Offloaded media storage" },
            ],
          },
          {
            label: "Automation and access",
            nodes: [
              {
                name: "AWS CloudFormation",
                detail: "Provisions the full environment as code",
              },
              { name: "IAM policies", detail: "Control access between services" },
            ],
          },
        ],
      },
      {
        kind: "table",
        title: "How the components fit together",
        columns: ["Component", "Role in the deployment"],
        rows: [
          ["Custom VPC", "An isolated network for the whole deployment, divided into public and private subnets."],
          ["Internet Gateway", "Connects the VPC to the internet."],
          ["NAT Gateway and Elastic IP", "Lets resources in private subnets make outbound connections without being directly reachable from the internet."],
          ["Route Tables", "Control which path each subnet uses for its traffic."],
          ["Application Load Balancer", "Receives incoming requests and distributes them across healthy instances."],
          ["EC2 launch template and custom AMI", "Define how every instance is configured, so each one starts identically."],
          ["Auto Scaling Group", "Maintains the desired number of healthy instances and adjusts capacity as demand changes."],
          ["Amazon RDS for MySQL (Multi-AZ)", "Hosts the WordPress database, with a standby copy that takes over automatically if the primary fails."],
          ["RDS read replicas", "Serve read traffic to reduce load on the primary database."],
          ["Amazon S3", "Stores WordPress media outside the instances."],
          ["IAM policies", "Define which permissions the services and instances in the deployment have."],
          ["AWS CloudFormation", "Defines and provisions all of the above as code."],
        ],
      },
      // VERIFY: matches how you actually laid out your subnets.
      {
        kind: "text",
        title: "Network design",
        paragraphs: [
          "The VPC separates public subnets, which hold internet-facing components, from private subnets, which are not directly reachable from the internet. An Internet Gateway provides the public path in and out, while a NAT Gateway with an Elastic IP lets private resources make outbound connections without being exposed. Route tables control which subnets use which path.",
          "This segmentation follows a standard principle: only what must face the internet is placed where the internet can reach it, and everything else stays internal.",
        ],
      },
      {
        kind: "text",
        title: "Compute and load balancing",
        paragraphs: [
          "Instances are launched from an EC2 launch template that uses a custom AMI, so every instance starts with the same pre-configured WordPress environment. An Auto Scaling Group maintains the desired number of healthy instances and adds or removes capacity as needed. An Application Load Balancer distributes incoming requests across them and routes around unhealthy instances.",
        ],
      },
      {
        kind: "text",
        title: "Database and storage",
        paragraphs: [
          "Amazon RDS for MySQL runs with Multi-AZ failover, which keeps a standby copy of the database in a separate Availability Zone and promotes it automatically if the primary fails. Read replicas take read traffic off the primary database.",
          "WordPress media is offloaded to Amazon S3, so the instances hold no unique files and can be replaced or scaled freely without losing content.",
        ],
      },
      // VERIFY: security measures beyond IAM and segmentation that you applied (for example security groups).
      {
        kind: "text",
        title: "Security considerations",
        bullets: [
          "IAM policies grant the services and instances in the deployment the permissions they need.",
          "Network segmentation keeps internal resources off the public internet.",
          "Traffic enters through controlled points: the Application Load Balancer for requests and the NAT Gateway for outbound access.",
        ],
      },
      {
        kind: "text",
        title: "Automation with CloudFormation",
        paragraphs: [
          "The whole environment (network, database, storage, compute and scaling) is defined in CloudFormation. That makes deployments repeatable, lets changes be reviewed as code, and allows the stack to be torn down and recreated consistently.",
        ],
      },
      {
        kind: "table",
        title: "Failover, scaling and recovery testing",
        intro: "The deployment was tested end to end across three areas.",
        columns: ["Area tested", "What the testing covers"],
        rows: [
          ["Failover", "Behaviour when a component becomes unavailable, including the database tier."],
          ["Scaling", "Capacity changes in the Auto Scaling Group behind the load balancer."],
          ["Recovery", "Return to a healthy state after a failure."],
        ],
      },
      // VERIFY: replace with real problems you solved if you have them.
      {
        kind: "text",
        title: "Design challenges",
        bullets: [
          "Dependency ordering: the network, database, storage and compute layers depend on each other, so the CloudFormation template has to create and reference resources in the right order.",
          "Statelessness: WordPress stores media on local disk by default, so media was moved to S3 to let instances be replaced or scaled without losing content.",
          "Availability at the data tier: the database is usually the hardest layer to make resilient, which is why it uses Multi-AZ failover and read replicas.",
          "Consistent instances: a custom AMI makes sure instances launched by Auto Scaling start identically.",
        ],
      },
      {
        kind: "text",
        title: "Outcomes",
        bullets: [
          "A repeatable, fully automated deployment defined in CloudFormation.",
          "A highly available design across the network, compute and database tiers.",
          "Failover, scaling and recovery tested end to end.",
        ],
      },
      // VERIFY: reflections in your own words.
      {
        kind: "text",
        title: "What I learned",
        paragraphs: [
          "This project strengthened my understanding of how AWS networking, compute, storage and database services fit together, and of how Infrastructure as Code makes complex environments repeatable. It also reinforced that availability has to be designed in at every layer, from the network to the database, rather than added later.",
        ],
      },
    ],
    repoUrl: "https://github.com/Vedant3007/aws-wordpress-deployment",
  },
  {
    slug: "hospital-appointment-system",
    title: "Hospital Appointment Booking System",
    category: "Systems · Containers",
    summary:
      "A full-stack appointment booking application built as six microservices, containerised with Docker and deployed to a Kubernetes cluster on Ubuntu Linux, with Prometheus, Grafana and Fluentd for monitoring and logging.",
    highlights: [
      "Designed and built a full-stack application structured as six microservices covering user authentication, appointment booking and notification workflows, using React.js, Node.js, Express and PostgreSQL.",
      "Containerised all services with Docker and deployed them to an Ubuntu Linux Kubernetes cluster, configuring NGINX Ingress and Kubernetes Secrets for secure, scalable routing.",
      "Integrated Twilio, SendGrid and Postfix for real-time email notifications.",
      "Deployed an observability stack with Prometheus, Grafana and Fluentd to monitor authentication activity and system logs.",
    ],
    demonstrates: [
      "Full-stack development",
      "Microservices architecture",
      "Containerisation with Docker",
      "Kubernetes orchestration",
      "Linux deployment",
      "Ingress routing and secrets management",
      "Monitoring and log aggregation",
      "Integration with external services",
    ],
    tech: [
      "Docker",
      "Kubernetes",
      "NGINX Ingress",
      "Prometheus",
      "Grafana",
      "Fluentd",
      "Ubuntu Linux",
      "Kubernetes Secrets",
      "React.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Twilio",
      "SendGrid",
      "Postfix",
    ],
    emphasis: "primary",
    image: "/images/projects/hospital-appointment-system.jpg",
    imageAlt: "Illustration representing containerised microservices running on Kubernetes",
    stats: [
      { value: "6", label: "Microservices" },
      { value: "3", label: "Notification integrations: Twilio, SendGrid, Postfix" },
      { value: "3", label: "Observability tools: Prometheus, Grafana, Fluentd" },
    ],
    sections: [
      // VERIFY: framing of the problem and objectives.
      {
        kind: "text",
        title: "Problem and objectives",
        paragraphs: [
          "Appointment booking involves several distinct concerns: who a user is, which slots are available, and how people are told about their bookings. Mixing them in one codebase makes a system harder to change, scale and troubleshoot. The goal was to build a booking application as independent microservices, and to operate it the way a real platform is run: containerised, orchestrated, observable and secured.",
        ],
        bullets: [
          "Split authentication, booking and notification workflows into separate services.",
          "Containerise every service with Docker.",
          "Deploy to Kubernetes on Ubuntu Linux and route traffic through NGINX Ingress.",
          "Keep sensitive configuration out of container images using Kubernetes Secrets.",
          "Send real-time email notifications through external providers.",
          "Monitor authentication activity and system logs with Prometheus, Grafana and Fluentd.",
        ],
      },
      { kind: "highlights", title: "What I built" },
      {
        kind: "architecture",
        title: "System architecture",
        caption:
          "A layered view of how requests, services, data, integrations and monitoring fit together.",
        tiers: [
          {
            label: "Client",
            nodes: [{ name: "React.js front end", detail: "User interface for booking" }],
          },
          {
            label: "Routing",
            nodes: [
              {
                name: "NGINX Ingress",
                detail: "Single entry point that routes requests to services",
              },
            ],
          },
          {
            label: "Application services",
            nodes: [
              {
                name: "Six microservices",
                detail: "User authentication, appointment booking and notification workflows",
              },
              {
                name: "Docker on Kubernetes (Ubuntu Linux)",
                detail: "Containerised services with Kubernetes Secrets for sensitive configuration",
              },
            ],
          },
          {
            label: "Data and integrations",
            connectsToNext: false,
            nodes: [
              { name: "PostgreSQL", detail: "Application data" },
              {
                name: "Twilio · SendGrid · Postfix",
                detail: "Real-time email notifications",
              },
            ],
          },
          {
            label: "Observability",
            nodes: [
              { name: "Prometheus", detail: "Metrics collection" },
              { name: "Grafana", detail: "Dashboards, including authentication activity" },
              { name: "Fluentd", detail: "System log collection" },
            ],
          },
        ],
      },
      {
        kind: "table",
        title: "Platform components",
        columns: ["Component", "Role in the platform"],
        rows: [
          ["Docker", "Packages each service with its dependencies into a portable image."],
          ["Kubernetes", "Schedules and manages the containers across the cluster."],
          ["NGINX Ingress", "Routes external traffic to the right service."],
          ["Kubernetes Secrets", "Holds sensitive configuration separately from container images."],
          ["PostgreSQL", "Stores the application’s data."],
          ["Twilio, SendGrid and Postfix", "External and self-hosted services used to deliver real-time email notifications."],
          ["Prometheus", "Collects metrics from the platform."],
          ["Grafana", "Visualises metrics as dashboards, including authentication activity."],
          ["Fluentd", "Collects and forwards system logs."],
        ],
      },
      {
        kind: "text",
        title: "Containerisation and deployment",
        paragraphs: [
          "Each service is packaged as a Docker image and deployed to a Kubernetes cluster running on Ubuntu Linux. Running the services as separate deployments means each one can be updated, restarted or scaled independently of the others.",
        ],
      },
      {
        kind: "text",
        title: "Routing and secrets",
        paragraphs: [
          "NGINX Ingress provides a single entry point and routes requests to the relevant service. Sensitive values such as credentials and API keys are held in Kubernetes Secrets rather than baked into container images, so they can be managed separately from the code.",
        ],
      },
      {
        kind: "text",
        title: "Monitoring and logging",
        paragraphs: [
          "Prometheus collects metrics and Grafana turns them into dashboards for watching authentication activity, while Fluentd collects system logs. Together they make it possible to see what the platform is doing and to trace a problem when something fails.",
        ],
      },
      // VERIFY: describe the Linux and cluster work you actually did.
      {
        kind: "text",
        title: "Linux and troubleshooting",
        paragraphs: [
          "Running the cluster on Ubuntu Linux meant working at the operating-system layer that everything else depends on, and diagnosing problems across containers, networking and services using logs and metrics.",
        ],
      },
      // VERIFY: replace with real problems you solved if you have them.
      {
        kind: "text",
        title: "Design challenges",
        bullets: [
          "Service boundaries: deciding which responsibilities belong in which of the six services so that each stays focused.",
          "Distributed troubleshooting: when a request crosses several services, finding the cause of a failure needs central logs and metrics, which is why Fluentd, Prometheus and Grafana were added.",
          "Configuration and secrets: keeping credentials out of images while still making them available to the right services.",
          "Reliable notifications: integrating several external providers and keeping notification delivery separate from the booking flow.",
        ],
      },
      {
        kind: "text",
        title: "Outcomes",
        bullets: [
          "A working six-service application, containerised and deployed on Kubernetes.",
          "A single entry point through NGINX Ingress, with sensitive configuration held in Kubernetes Secrets.",
          "Real-time email notifications through integrated providers.",
          "Visibility into authentication activity and system logs through monitoring and logging.",
        ],
      },
      // VERIFY: reflections in your own words.
      {
        kind: "text",
        title: "What I learned",
        paragraphs: [
          "This project showed how much of running software is operational: routing, configuration, secrets, monitoring and logging matter as much as the application code. It strengthened my Linux and troubleshooting skills and my understanding of how containerised systems behave inside a cluster.",
        ],
      },
    ],
    repoUrl: "https://github.com/Vedant3007/hospital-appointment-system",
  },
  {
    slug: "accessibility-pathfinding",
    title: "Accessibility-Aware Pathfinding Tool",
    category: "Software · Algorithms",
    summary:
      "An interactive Python route planner that finds wheelchair- and mobility-friendly paths over real street networks, using Dijkstra’s and A* search with heuristics that account for stairs and ramps.",
    highlights: [
      "Developed an interactive, map-based routing application in Python that calculates optimal, wheelchair- and mobility-friendly paths using Dijkstra’s and A* search algorithms.",
      "Modelled real-world street networks from actual map data using NetworkX, with customisable heuristics that account for accessibility constraints such as stairs and ramps.",
      "Built a user-centred Tkinter GUI with Matplotlib to visualise real-time route generation and compare algorithm efficiency.",
    ],
    demonstrates: [
      "Computer Science foundations",
      "Graph algorithms and heuristic design",
      "Problem-solving",
      "Building practical applications",
    ],
    tech: [
      "Python",
      "NetworkX",
      "A* Search",
      "Dijkstra’s Algorithm",
      "Tkinter",
      "Matplotlib",
    ],
    emphasis: "supporting",
    image: "/images/projects/accessibility-pathfinding.jpg",
    imageAlt: "Illustration representing route finding across a street network",
    stats: [
      { value: "2", label: "Search algorithms implemented and compared" },
      { value: "Real", label: "Street networks modelled from actual map data" },
      { value: "Live", label: "Route visualisation as paths are generated" },
    ],
    sections: [
      // VERIFY: framing of the problem and objectives.
      {
        kind: "text",
        title: "Problem and objectives",
        paragraphs: [
          "Standard routing optimises for distance or time and ignores whether a route is usable by someone who uses a wheelchair or has limited mobility. Stairs, steep slopes or a missing ramp can make the shortest path impassable. The goal was to build a route planner that treats accessibility as a core constraint, not an afterthought.",
        ],
        bullets: [
          "Model real street networks as graphs using actual map data.",
          "Implement Dijkstra’s and A* search.",
          "Design heuristics that account for stairs and ramps.",
          "Provide an interface that visualises routes as they are generated.",
          "Compare how efficiently the two algorithms find a route.",
        ],
      },
      { kind: "highlights", title: "What I built" },
      {
        kind: "architecture",
        title: "How the tool fits together",
        caption: "From map data to a visualised route.",
        tiers: [
          {
            label: "Data",
            nodes: [{ name: "Real-world map data", detail: "Actual street network data" }],
          },
          {
            label: "Graph model",
            nodes: [
              {
                name: "NetworkX street network",
                detail: "Intersections as nodes, street segments as edges",
              },
            ],
          },
          {
            label: "Search",
            nodes: [
              { name: "Dijkstra’s algorithm", detail: "Lowest-cost path from the start" },
              {
                name: "A* search",
                detail: "Heuristic-guided search with accessibility constraints",
              },
            ],
          },
          {
            label: "Interface",
            nodes: [
              { name: "Tkinter GUI", detail: "Plan a route interactively" },
              {
                name: "Matplotlib visualisation",
                detail: "Real-time route generation and algorithm comparison",
              },
            ],
          },
        ],
      },
      {
        kind: "table",
        title: "Dijkstra’s algorithm and A* compared",
        intro: "The two algorithms share a goal but search differently, which is why the tool compares them.",
        columns: ["Aspect", "Dijkstra’s algorithm", "A* search"],
        rows: [
          ["Core idea", "Expands outward from the start, always taking the lowest cost so far.", "Expands by cost so far plus a heuristic estimate of the cost remaining."],
          ["Guided toward the goal", "No.", "Yes, through the heuristic."],
          ["Finds the optimal route", "Yes.", "Yes, when the heuristic never overestimates."],
          ["Typical trade-off", "Explores more of the graph.", "Explores less when the heuristic is informative."],
          ["Role in this tool", "Baseline for comparison.", "Heuristic search that carries the accessibility constraints."],
        ],
      },
      {
        kind: "text",
        title: "Modelling the street network",
        paragraphs: [
          "Real map data is converted into a graph in which intersections are nodes and street segments are edges. Each edge can carry attributes that describe accessibility, such as whether a segment includes stairs or a ramp, so the search can reason about whether it is usable.",
        ],
      },
      // VERIFY: how your heuristics actually treat stairs and ramps.
      {
        kind: "text",
        title: "Accessibility-aware heuristics",
        paragraphs: [
          "The heuristics are customisable, so accessibility constraints can be weighted or applied depending on the user’s needs. For example, a segment with stairs can be penalised or avoided, while a ramp can be treated as acceptable. This is what separates the tool from a standard shortest-path planner.",
        ],
      },
      {
        kind: "text",
        title: "Interface and visualisation",
        paragraphs: [
          "A Tkinter interface lets a user plan a route. Matplotlib draws the street network and shows the route as it is generated, and it compares how efficiently the two algorithms find it, so the behaviour of each is easy to see.",
        ],
      },
      // VERIFY: replace with real problems you solved if you have them.
      {
        kind: "text",
        title: "Design challenges",
        bullets: [
          "Representing accessibility: turning real-world features such as stairs and ramps into data a search algorithm can use.",
          "Keeping heuristics useful: an A* heuristic has to guide the search without compromising the correctness of the route.",
          "Working with real map data: street networks are larger and more irregular than textbook graphs.",
          "Making the algorithms understandable: visualising the search in real time so differences between algorithms are visible.",
        ],
      },
      {
        kind: "text",
        title: "Outcomes",
        bullets: [
          "A working route planner that finds mobility-friendly paths on real street networks.",
          "Two search algorithms implemented and compared inside the same tool.",
          "An interface that makes the behaviour of the algorithms visible.",
        ],
      },
      // VERIFY: reflections in your own words.
      {
        kind: "text",
        title: "What I learned",
        paragraphs: [
          "This project connected algorithm theory to a practical problem. It showed how much the quality of a result depends on how the problem is modelled, and how a well-chosen heuristic changes both the efficiency and the usefulness of a search.",
        ],
      },
    ],
    repoUrl: "https://github.com/Vedant3007/accessibility-pathfinding",
  },
];