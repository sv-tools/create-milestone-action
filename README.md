# create-milestone-action
Create a new milestone or return an existing one. Pure JS action.

## Inputs

### `token`

**Required** GitHub Token.

### `title`

**Required** The title of a milestone.

### `state`

The state of a milestone. Either `open` or `closed`. Default `open`.

### `description`

The description of a milestone.

### `due_on`

The due date of a milestone. Timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.


## Outputs

### `id`

An ID of the changed milestone.

### `number`

A Number of the changed milestone.

### `state`

A State of the changed milestone.

### `title`

A Title of the changed milestone.

### `description`

A Description of the changed milestone.

### `due_on`

The due date of the changed milestone.

## Example

```yaml
uses: sv-tools/create-milestone-action@v1
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  title: Next
  description: Next Release, To be renamed with a proper semver.
```
