# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env

{ pkgs, ... }: {
  channel = "stable-24.05";
  
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.bun
    pkgs.openssh
    pkgs.nodejs_20
    pkgs.typescript
  ];

}