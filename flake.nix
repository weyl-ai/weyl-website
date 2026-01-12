{
  description = "Weyl Website";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      inherit (nixpkgs) lib;

      eachSystem = fn: lib.genAttrs lib.systems.flakeExposed (
        system:
        fn {
          inherit system;
          pkgs = nixpkgs.legacyPackages.${system};
        }
      );
    in
    {
      devShells = eachSystem (
        { pkgs, ... }:
        {
          default = pkgs.mkShellNoCC {
            packages = with pkgs; [
              bun
            ];
          };
        }
      );

      formatter = eachSystem ({ pkgs, ... }: pkgs.nixfmt);
    };
}
