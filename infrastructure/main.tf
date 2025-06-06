########################################
# Terraform Setup: AWS ECR + EKS + OIDC
########################################

provider "aws" {
  region = var.aws_region
}

provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  token                  = data.aws_eks_cluster_auth.token.token
}

data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_name
}

data "aws_eks_cluster_auth" "token" {
  name = module.eks.cluster_name
}

########################################
# Variables
########################################

variable "aws_region" {
  default = "us-east-1"
}

variable "project_name" {
  default = "portfolio-2025"
}

variable "github_repo" {
  default = "cdsandrade/portfolio-2025"
}

########################################
# ECR Repositories
########################################

resource "aws_ecr_repository" "api" {
  name                 = "${var.project_name}-api"
  image_tag_mutability = "IMMUTABLE"
}

resource "aws_ecr_repository" "webapp" {
  name                 = "${var.project_name}-webapp"
  image_tag_mutability = "IMMUTABLE"
}

########################################
# EKS Cluster (with module)
########################################

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.21.0"  # "5.1.2"

  name            = "${var.project_name}-vpc"
  cidr            = "10.0.0.0/16"
  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }

  putin_khuylo = false  # 🤣 I can't...
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.36.0"

  cluster_name    = "${var.project_name}-cluster"
  cluster_version = "1.29"
  subnet_ids      = module.vpc.private_subnets
  vpc_id          = module.vpc.vpc_id

  eks_managed_node_groups = {
    default = {
      desired_size = 2
      max_size     = 3
      min_size     = 1

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
    }
  }

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }

  putin_khuylo = false  # 🤣 I can't...
}

########################################
# GitHub Actions OIDC Provider + Role
########################################

# resource "aws_iam_openid_connect_provider" "github" {
#   url = "https://token.actions.githubusercontent.com"

#   client_id_list = ["sts.amazonaws.com"]
#   thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
# }

# resource "aws_iam_role" "github_actions_deployer" {
#   name = "${var.project_name}-github-actions-deployer"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Effect = "Allow",
#         Principal = {
#           Federated = aws_iam_openid_connect_provider.github.arn
#         },
#         Action = "sts:AssumeRoleWithWebIdentity",
#         Condition = {
#           StringLike = {
#             "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:ref:refs/heads/*"
#           }
#         }
#       }
#     ]
#   })
# }

# resource "aws_iam_role_policy_attachment" "actions_permissions" {
#   role       = aws_iam_role.github_actions_deployer.name
#   policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
# }

########################################
# Outputs
########################################

output "kubeconfig" {
  value     = module.eks.kubeconfig
  sensitive = true
}

output "cluster_name" {
  value = module.eks.cluster_name
}

output "ecr_api_repo_url" {
  value = aws_ecr_repository.api.repository_url
}

output "ecr_webapp_repo_url" {
  value = aws_ecr_repository.webapp.repository_url
}

# output "github_actions_role_arn" {
#   value = aws_iam_role.github_actions_deployer.arn
# }
