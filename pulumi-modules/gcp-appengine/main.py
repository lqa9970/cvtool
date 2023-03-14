import base64
import os
import shutil
import tempfile

import pulumi
from pulumi import Output, ComponentResource
from pulumi_gcp.appengine import StandardAppVersion, StandardAppVersionDeploymentArgs

class AppEngine(ComponentResource):
    def __init__(self, name: str, version: str, source_directory: str, service: str, runtime: str, region: str, env_variables: dict = {}, **kwargs) -> None:
        super().__init__("custom:gcp:AppEngine", name, {}, **kwargs)

        tempdir = tempfile.mkdtemp()
        shutil.copytree(source_directory, os.path.join(tempdir, "src"))

        # Create a zip file from the source directory
        zip_file = shutil.make_archive(os.path.join(tempdir, "app"), "zip", root_dir=tempdir)

        # Read the zip file contents as base64
        with open(zip_file, "rb") as f:
            deployment_zip = base64.b64encode(f.read()).decode("utf-8")

        app = StandardAppVersion(
            f"{name}-{version}",
            service=service,
            version_id=version,
            runtime=runtime,
            env_variables=env_variables,
            deployment=StandardAppVersionDeploymentArgs(
                zip=deployment_zip
            ),
            location_id=region,
            opts=pulumi.ResourceOptions(parent=self),
        )

        self.url = Output.concat("https://", app.version_url)
        self.register_outputs({
            "url": self.url,
        })