export AWS_SHARED_CREDENTIALS_FILE="$HOME/.config/aws/credentials"
export AWS_CONFIG_FILE="$HOME/.config/aws/config"

if command -v aws > /dev/null; then
  function export_aws_credentials() {
    export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id --profile="$1")
    export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key --profile="$1")
    if [ -z "$1" ]; then
      echo "AWS environmental variables cleared"
    else
      echo "Loaded '$1' AWS env vars"
    fi
  }

  alias expaws=export_aws_credentials
fi
